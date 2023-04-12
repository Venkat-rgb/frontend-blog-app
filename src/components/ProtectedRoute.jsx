import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user?.userInfo?.id ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
