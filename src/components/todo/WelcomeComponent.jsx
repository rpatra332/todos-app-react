import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  retrieveHelloWorldBean,
  retrieveHelloWorldPathVariable,
} from "../../api/HelloWorldApiService";

export default function WelcomeComponent() {
  const params = useParams();

  const [message, setMessage] = useState(null);

  const callHelloWorldBeanRestApi = async () => {
    retrieveHelloWorldBean()
      .then((resp) => successfulResponse(resp))
      .catch((err) => errorResponse(err));
  };

  const callHelloWorldPathVariableRestApi = async () => {
    retrieveHelloWorldPathVariable(params.username)
      .then((resp) => successfulResponse(resp))
      .catch((err) => errorResponse(err));
  };

  const successfulResponse = (response) => {
    setMessage(response.data.message);
  };
  const errorResponse = (error) => {
    console.error(error);
  };

  return (
    <div className="Welcome">
      <h1>Welcome {params.username}</h1>
      <div>
        <Link to="/todos">Manage Your todos</Link>
      </div>
      <div>
        <button
          className="btn btn-success m-5"
          onClick={callHelloWorldBeanRestApi}
        >
          Call the Hello World Bean
        </button>
        <button
          className="btn btn-success m-5"
          onClick={callHelloWorldPathVariableRestApi}
        >
          Call the Hello World with Path Variable
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}
