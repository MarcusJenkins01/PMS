import { Navigate } from "react-router-dom";

const AuthRoute = (props) => {
  return props.token ? props.children : <Navigate to="/login"/>
}

export default AuthRoute;
