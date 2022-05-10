import LoginForm from "./LoginForm";

function LoginPage(props) {
  return (
    <LoginForm setToken={props.setToken} setAdmin={props.setAdmin}/>
  );
}

export default LoginPage;
