// PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useUser } from './UserContext';

function PrivateRoute({ element, ...rest }) {
  const { jwt } = useUser();

  // Check if the user is authenticated (has a valid JWT token)
  const isAuthenticated = !!jwt;

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
