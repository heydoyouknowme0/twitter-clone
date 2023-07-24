import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Up.css";

const Login = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <div className="modal-container modal-containerac">
          <div className="modal">
            <div className="logo">
              <img src="twitter-logo.png" alt="Twitter Logo" />
            </div>
            <h2>Login to your account</h2>

            <div className="input-group">
              <Field
                type="email"
                name="email"
                id="email"
                placeholder=" "
                className="input-field"
              />
              <label htmlFor="email" className="floating-label">
                Email
              </label>
            </div>

            <div className="input-group">
              <Field
                type="password"
                name="password"
                id="password"
                placeholder=" "
                className="input-field"
              />
              <label htmlFor="password" className="floating-label">
                Password
              </label>
            </div>

            <button type="submit">Log in</button>
            <p className="up-link">
              Don't have an account?{" "}
              <a href="#" className="up-link">
                Sign up
              </a>
            </p>
          </div>
        </div>
        <div className="modal-container below">
          <ErrorMessage
            name="email"
            component="div"
            className="error-message"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="error-message"
          />
        </div>
      </Form>
    </Formik>
  );
};

export default Login;
