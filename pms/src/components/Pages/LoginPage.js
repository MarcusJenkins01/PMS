import RoundedButton from "../Buttons/RoundedButton";

function LoginPage() {
  return (
    <form>
      <input id="email" name="email" type="email" required/>
      <label htmlFor="email">Email</label>

      <input id="password" name="password" type="password" required/>
      <label htmlFor="password">Password</label>

      <RoundedButton colour="green" submit={true}>SUBMIT</RoundedButton>
      <RoundedButton colour="green" href="/book">BOOK SPACE</RoundedButton>
      <RoundedButton colour="green" onClick="myJavascriptFunction()">BOOK SPACE</RoundedButton>
    </form>
  );
}

export default LoginPage;
