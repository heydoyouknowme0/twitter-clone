import { Formik, Field, Form, ErrorMessage } from "formik";
import { ChangeEvent, useState } from "react";
import * as Yup from "yup";
import "./Up.css";
import { Twitter } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../auth";
import ErrorComponent from "../ErrorMessageSnackbar";
import Compressor from "compressorjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

type ValuesType = {
  displayName: string;
  email: string;
  password: string;
};
type ValuesType2 = {
  displayname: string;
};
type EssUser = {
  UID: string;
  displayName: string | null;
};
const Signup = () => {
  const { signUp, signUpExt } = useUserAuth();
  const [stage, setStage] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [selectedImage, setSelectedImage] = useState<File>();
  const [errorMessage, setErrorMessage] = useState("");
  const [EssUser, setEssUser] = useState<EssUser>({
    UID: "",
    displayName: "",
  });
  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      const file = event.target.files[0];
      const fileSizeLimit = 5 * 1024 * 1024;
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (file.size <= fileSizeLimit && allowedTypes.includes(file.type)) {
        setErrorMessage("");

        try {
          const compressedFile = await compressImage(file);
          setSelectedImage(compressedFile);
        } catch (error) {
          console.error("Error compressing image:", error);
          event.target.value = "";
          setErrorMessage("Error compressing");
        }
      } else {
        event.target.value = "";
        setErrorMessage(
          "Invalid file selected. Please choose a valid image file."
        );
      }
    }
  };
  const t = useNavigate();
  const compressImage = (file: File): Promise<File> => {
    return new Promise<File>((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        success: (result) => {
          resolve(new File([result], file.name, { type: result.type }));
        },
        error: (error: Error) => reject(error),
      });
    });
  };
  const handleSignUp = async (values: ValuesType) => {
    try {
      setLoading(true);
      setErrors("");
      const credentials = await signUp(
        values.email,
        values.password,
        values.displayName
      );
      setEssUser({
        UID: credentials.uid,
        displayName: credentials.displayName,
      });
      setStage(true);
      console.log("Signed up:", credentials);
    } catch (error: any) {
      console.error("Sign up error:", error.toString());
      setErrors(error.toString());
    } finally {
      setLoading(false);
    }
  };
  const handleSignUp2 = async (values: ValuesType2) => {
    try {
      console.log("sdsf");
      setLoading(true);
      setErrors("");
      let avatar = "";
      if (selectedImage) {
        const storageRef = ref(storage, `pfp/${EssUser.displayName}`);
        await uploadBytes(storageRef, selectedImage);

        avatar = await getDownloadURL(storageRef);
      }
      await signUpExt(
        values.displayname,
        EssUser.displayName || "",
        avatar,
        EssUser.UID
      );
      t("/home");
    } catch (error: any) {
      console.error("Sign up error:", error.toString());
      setErrors(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {stage ? (
        <Formik
          initialValues={{
            displayname: "",
          }}
          validationSchema={Yup.object({
            displayname: Yup.string().required("Name is required"),
          })}
          onSubmit={handleSignUp2}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="modal-container modal-containerac">
                <div className="modal-container">
                  <div className="modal">
                    <div className="logo">
                      <Twitter />
                    </div>
                    <h2 className="h2up">Create your account</h2>

                    <div className="inputs">
                      <div className="input-group">
                        <Field
                          type="text"
                          name="displayname"
                          placeholder=""
                          className="input-field"
                        />
                        <label htmlFor="displayname" className="floating-label">
                          Name
                        </label>
                      </div>

                      <div className="input_err">
                        <ErrorMessage
                          name="displayname"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <input
                        type="file"
                        id="input-file"
                        accept="image/*"
                        onChange={handleImageSelect}
                      />
                      <label htmlFor="avatar" className="floating-label">
                        avatar
                      </label>
                    </div>

                    <button type="submit">
                      {loading ? "Loading..." : "Sign up"}
                    </button>

                    <p className="up-link">
                      Already have an account? <Link to={"/"}>Log in</Link>
                    </p>
                    {errors ? <ErrorComponent errors={errors} /> : null}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            displayName: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            displayName: Yup.string().required("Name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          })}
          onSubmit={handleSignUp}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="modal-container modal-containerac">
                <div className="modal-container">
                  <div className="modal">
                    <div className="logo">
                      <Twitter />
                    </div>
                    <h2 className="h2up">Create your account</h2>

                    <div className="inputs">
                      <div className="input-group">
                        <Field
                          type="text"
                          name="displayName"
                          placeholder=""
                          className="input-field"
                        />
                        <label htmlFor="displayName" className="floating-label">
                          UserName
                        </label>
                      </div>

                      <div className="input_err">
                        <ErrorMessage
                          name="displayName"
                          component="div"
                          className="error-message"
                        />
                      </div>

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
                          placeholder="'"
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

                    <button type="submit">
                      {loading ? "Loading..." : "Sign up"}
                    </button>

                    <p className="up-link">
                      Already have an account? <Link to={"/"}>Log in</Link>
                    </p>
                    {errors ? <ErrorComponent errors={errors} /> : null}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default Signup;
