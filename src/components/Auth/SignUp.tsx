import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Box, IconButton, InputAdornment, Paper } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerAction } from "../../lib/api";
import { selectUi } from "../../store";
import { uiActions } from "../../store/ui-slice";
import StyledAuthForm from "../styles/AuthForm.styled";
import Button from "../UI/Button";
import { LoadingSpinner } from "../UI/LoadingSpinner";

interface FormValues {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector(selectUi);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (loadingStatus === "success") {
      dispatch(uiActions.setLoadingStatus(""));
      history.push("/sign-in");
    }
  }, [loadingStatus, history, dispatch]);

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const clickShowPassword = () => {
    setShowPassword((prevPasswordState) => !prevPasswordState);
  };
  const toggleAuthHandler = () => {
    history.push("/sign-in");
  };
  return (
    <StyledAuthForm>
      <Paper>
        <h1>Sign Up</h1>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<FormValues> = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 6) {
              errors.password = "Must be 6 characters long";
            }
            return errors;
          }}
          onSubmit={(values) => {
            dispatch(
              registerAction({ email: values.email, password: values.password })
            );
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Box margin={1}>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Enter Email"
                  helperText=" "
                  fullWidth
                />
              </Box>
              <Box margin={1}>
                <Field
                  component={TextField}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  helperText=" "
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={clickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              {loadingStatus === "pending" && (
                <div className="centered">
                  <LoadingSpinner />
                </div>
              )}
              <Box margin={1}>
                <Button
                  className="action"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Register
                </Button>
              </Box>
              <div className="toggle" onClick={toggleAuthHandler}>
                Login with existing account
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </StyledAuthForm>
  );
};

export default SignUp;
