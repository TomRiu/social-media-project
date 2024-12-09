import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUserAction, resetAuthAction } from "../../Redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = { email: "", password: "" };
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (auth.error) {
      dispatch(resetAuthAction());
    }
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      const message = auth.error?.response?.data?.message || auth.error;
      if (message && message !== "invalid token ...") {
        setErrorMessage(message);
      }
    }
    if (auth.jwt && auth.user) {
      navigate("/"); 
    }
  }, [auth, navigate]);

  const handleLogin = (values) => {
    console.log("handle submit", values);
    dispatch(loginUserAction({ data: values }));
  };

  return (
    <>
      <Formik
        onSubmit={handleLogin}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </div>
          </div>
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
        </Form>
      </Formik>
      <div className="flex gap-2 items-center justify-center pt-5">
        <p>If you don't have an account?</p>
        <Button
          onClick={() => {
            dispatch(resetAuthAction());
            navigate("/register");
          }}
        >
          Register
        </Button>
      </div>
    </>
  );
};

export default Login;
