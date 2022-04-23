import LoginForm from "./LoginForm";

function LoginPage(props) {
  return (
    <LoginForm setToken={props.setToken}/>
  );
}

export default LoginPage;
