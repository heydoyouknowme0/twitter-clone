import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Up.css";

const Signup = () => {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="logo">
          <img src="twitter-logo.png" alt="Twitter Logo" />
        </div>
        <h2>Create your account</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          })}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="input-field"
              />
            </div>
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />

            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="input-field"
              />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="input-field"
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />

            <button type="submit">Sign up</button>
          </Form>
        </Formik>

        <p className="up-link">
          Already have an account?{" "}
          <a href="#" className="up-link">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};
export default Signup;
