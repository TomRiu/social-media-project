import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Redux/Auth/auth.action";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Paper className="max-w-md w-full p-8 space-y-6">
        <div className="text-center">
          <MailOutline className="mx-auto h-12 w-12 text-blue-500" />
          <Typography
            component="h2"
            variant="h4"
            className="mt-4 text-center text-gray-900"
          >
            Forgot Password
          </Typography>
          <Typography
            variant="body2"
            className="mt-2 text-center text-gray-600"
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Box className="space-y-4">
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white"
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={auth.loading}
            className="py-3"
          >
            {auth.loading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className="py-3"
            onClick={() => {
              navigate("/login");
            }}
          >
            Back to Login
          </Button>
        </div>

        {auth.message &&
          ((auth.message.token === "Success" && (
            <Alert severity="success" className="mt-4">
              {auth.message.message}
            </Alert>
          )) ||
            (auth.message.token === "Failure" && (
              <Alert severity="error" className="mt-4">
                {auth.message.message}
              </Alert>
            )))}
      </Paper>
    </div>
  );
};

export default ForgotPassword;
