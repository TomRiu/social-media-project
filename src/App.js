import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import HomePage from './pages/HomePage/HomePage';
import Message from './pages/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';

function App() {
  const { auth } = useSelector(store => store);
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

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/message"
          element={
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={auth.user ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;

