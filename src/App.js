// src/App.js
import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import HomePage from './pages/HomePage/HomePage';
import Message from './pages/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Profile from './pages/Profile/Profile'; // Import Profile directly
import Reels from './components/Reels/Reels';
import CreateReelsForm from './components/Reels/CreateReelsForm';
import { getProfileAction } from './Redux/User/user.action';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';

function App() {
  const auth = useSelector(store => store.auth);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileAction(jwt));
    }
  }, [jwt, dispatch]);

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Authentication><Login /></Authentication>} />
        <Route path="/register" element={<Authentication><Register /></Authentication>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          {/* Nested Protected Routes */}
          <Route path="profile/:id" element={<Profile />} />
          <Route path="reels" element={<Reels />} />
          <Route path="create-reels" element={<CreateReelsForm />} />
          {/* Add other nested routes here if necessary */}
        </Route>
        <Route
          path="/message"
          element={
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={user.profile.data ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;
