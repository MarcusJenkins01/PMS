import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutRoute = (props) => {
  window.sessionStorage.removeItem('token');
  useEffect(() => props.setToken(null));

  return <Navigate to="/login"/>;
};

export default LogoutRoute;
