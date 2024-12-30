import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../Redux/Auth/auth.action";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const navigate = useNavigate();
  console.log(auth);

  // Password validation criteria
  const validations = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const isPasswordValid = Object.values(validations).every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid) {
      dispatch(resetPassword(token, newPassword));
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Paper className="max-w-md w-full p-8 space-y-6">
        <div className="text-center">
          <LockOutlined className="mx-auto h-12 w-12 text-blue-500" />
          <Typography
            component="h2"
            variant="h4"
            className="mt-4 text-center text-gray-900"
          >
            Reset Password
          </Typography>
          <Typography
            variant="body2"
            className="mt-2 text-center text-gray-600"
          >
            Please enter your new password below
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Box className="space-y-4">
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="bg-white"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <List dense className="bg-gray-50 rounded-lg p-4">
              {Object.entries({
                "At least 8 characters": validations.minLength,
                "One uppercase letter": validations.hasUppercase,
                "One lowercase letter": validations.hasLowercase,
                "One number": validations.hasNumber,
                "One special character": validations.hasSpecial,
              }).map(([text, isValid]) => (
                <ListItem key={text} className="px-0 py-1">
                  <ListItemIcon className="min-w-0 mr-2">
                    {isValid ? (
                      <CheckCircle
                        className="text-green-500"
                        fontSize="small"
                      />
                    ) : (
                      <Cancel className="text-red-500" fontSize="small" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    className={isValid ? "text-green-700" : "text-red-700"}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={!isPasswordValid || auth.loading}
            className="py-3"
          >
            {auth.loading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              "Reset Password"
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

export default ResetPassword;
