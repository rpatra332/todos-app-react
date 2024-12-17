import { useEffect, useState } from "react";
import {
  deleteTodoById,
  retrieveAllTodosForUsername,
} from "../../api/TodosApiSevice";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  const authContext = useAuth();
  const navigate = useNavigate();

  const refreshTodos = () => {
    retrieveAllTodosForUsername(authContext.username)
      .then((resp) => {
        setTodos(resp.data);
      })
      .catch((err) => console.log(err));
  };
  const deleteTodo = (id) => {
    deleteTodoById(authContext.username, id)
      .then(() => {
        setMessage(`Deleted Todo with id ${id} successful.`);
        refreshTodos();
      })
      .catch((err) => console.log(err));
  };
  const updateTodo = (id) => {
    navigate(`/todo/${id}`);
  };
  const addNewTodo = () => {
    navigate(`/todo/-1`);
  };

  useEffect(() => refreshTodos(), []);

  return (
    <div className="container">
      <h1>Things you want to do!</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              {/* <td>ID</td> */}
              <th>Description</th>
              <th>Is Done</th>
              <th>Description</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-success m-5" onClick={addNewTodo}>
        Add New Todo
      </button>
    </div>
  );
}
