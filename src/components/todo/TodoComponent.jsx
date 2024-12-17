import { useNavigate, useParams } from "react-router-dom";
import {
  createTodo,
  retrieveTodoById,
  updateTodo,
} from "../../api/TodosApiSevice";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

export default function TodoComponent() {
  const { id } = useParams();
  const authContext = useAuth();
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const navigate = useNavigate();

  const retrieveTodo = () => {
    if (parseInt(id) !== -1) {
      retrieveTodoById(authContext.username, id)
        .then((resp) => {
          setDescription(resp.data.description);
          setTargetDate(resp.data.targetDate);
        })
        .catch((err) => console.log(err));
    }
  };
  const onSubmit = async (values) => {
    const todo = {
      id: id,
      username: authContext.username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    if (parseInt(id) !== -1) {
      await updateTodo(authContext.username, id, todo)
        .then(navigate("/todos"))
        .catch((err) => console.log(err));
    } else {
      await createTodo(authContext.username, todo)
        .then(navigate("/todos"))
        .catch((err) => console.log(err));
    }
  };
  const formValidate = (values) => {
    let errors = {};
    if (values.description.length < 5) {
      errors.description = "Enter at least 5 characters!";
    }
    if (!values.targetDate || !moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter a valid date";
    }
    return errors;
  };

  useEffect(() => retrieveTodo(), [id]);

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={formValidate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
