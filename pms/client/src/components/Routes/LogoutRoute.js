import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutRoute = (props) => {
  window.sessionStorage.removeItem('token');
  useEffect(() => props.setToken(null));

  console.log("hi");

  return <Navigate to="/login"/>;
};

export default LogoutRoute;
