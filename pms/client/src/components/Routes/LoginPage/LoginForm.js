import Form from "../../Forms/Form";
import TextInput from "../../Forms/Inputs/TextInput";
import PasswordInput from "../../Forms/Inputs/PasswordInput";
import RoundedButton from "../../Forms/Inputs/RoundedButton";
import SubTextLink from "../../Forms/SubTextLink";
import SubTextError from "../../Forms/SubTextError";
import LoginConfirmation from "../../Confirmations/LoginConfirmation";
import { useState } from "react";

import http from "../../../axios-configuration";

function LoginForm(props) {
  const [errorText, setErrorText] = useState("");
  const [success, setSuccess] = useState(false);

  const processLogin = (formData) => {
    let email = formData.email;
    let pass = formData.pass;
    
    // Regex sourced from https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    if (email.length === 0 || !email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setErrorText("Please enter a valid email");
      return;
    }

    if (pass.length < 5 || pass.length > 32) {
      setErrorText("Password must be between 5 and 32 characters");
      return;
    }

    http.post('/accounts/login', formData).then(res => {
      if (res.data.err) {
        setErrorText(res.data.info);
      } else {
        setErrorText("");
        
        props.setToken(res.data.token);
        window.sessionStorage.setItem('token', res.data.token);

        setSuccess(true);
        console.log(res.data);
        console.log("Successfully logged in")
      }
    });
  }
  
  return (
    success ? <LoginConfirmation/> :
    <Form process={processLogin}>
      <TextInput name="email" type="email">Email</TextInput>
      <PasswordInput name="pass">Password</PasswordInput>
      <RoundedButton colour="green" submit={true}>LOGIN</RoundedButton>
      <SubTextLink textPart1="Don't have an account? Click " href="/register" textPart2=" to register"/>
      { errorText.length > 0 ? <SubTextError errorText={errorText}/> : <></> }
    </Form>
  );
}

export default LoginForm;
