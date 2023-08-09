import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import "./Up.css";
import { Link } from "react-router-dom";
import { Twitter } from "@mui/icons-material";
import { useUserAuth } from "../../auth";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../ErrorMessageSnackbar";
type ValuesType = {
  email: string;
  password: string;
};
const Login = () => {
  const { logIn, user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const t = useNavigate();
  useEffect(() => {
    if (user) {
      t("/home");
    }
  }, []);
  const handleSignIn = async (values: ValuesType) => {
    try {
      setLoading(true);
      setErrors(""); // Set loading to true before starting sign-up process
      const credentials = await logIn(values.email, values.password);
      console.log("Logged In:", credentials.user);
      t("/home");
    } catch (error: any) {
      console.error("Login error:", error.message);
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };
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
      onSubmit={handleSignIn}
    >
      <Form>
        <div className="modal-container modal-containerac">
          <div className="modal">
            <div className="logo">
              <Twitter />
            </div>
            <h2 className="h2up">Login to your account</h2>
            <div className="inputs">
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
              <div className="input_err">
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
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
              <div className="input_err">
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <button type="submit">{loading ? "Loading..." : "Log in"}</button>
            <p className="up-link">
              Don't have an account? <Link to={"/signup"}>Sign up</Link>
            </p>
            {errors ? <ErrorComponent errors={errors} /> : null}
          </div>
        </div>
        <div className="modal-container below">
          {loading ? (
            <div className="center">
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
          ) : null}
        </div>
      </Form>
    </Formik>
  );
};

export default Login;
