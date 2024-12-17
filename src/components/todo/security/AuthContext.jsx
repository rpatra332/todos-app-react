import { createContext, useContext, useState } from "react";

import { apiClient } from "../../../api/ApiClient";

import { executeJwtAuthenticationService } from "../../../api/AuthenticationApiService";

//1: Create a context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2: Share the created context with each other

export default function AuthProvider({ children }) {
  //3: Put some state in  the context
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // const login = (username, password) => {
  //   if (username === "rp" && password === "dummy") {
  //     setAuthenticated(true);
  //     setUsername(username);
  //     return true;
  //   } else {
  //     setAuthenticated(false);
  //     setUsername(null);
  //     return false;
  //   }
  // };

  // const login = async (username, password) => {
  //   const basicToken = "Basic " + window.btoa(username + ":" + password);
  //   try {
  //     const response = await executeBasicAuthenticationService(basicToken);
  //     if (response.status === 200) {
  //       setAuthenticated(true);
  //       setUsername(username);
  //       setToken(basicToken);
  //       apiClient.interceptors.request.use((config) => {
  //         console.log("Intercepting Requests");
  //         console.log(config);
  //         config.headers.Authorization = basicToken;
  //         return config;
  //       });
  //       return true;
  //     } else {
  //       logout();
  //       return false;
  //     }
  //   } catch {
  //     logout();
  //     return false;
  //   }
  // };

  const login = async (username, password) => {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );
      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = jwtToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch {
      logout();
      return false;
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
