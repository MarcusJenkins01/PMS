import { useState } from "react";

import Form from "../../Forms/Form";
import TextInput from "../../Forms/Inputs/TextInput";
import PasswordInput from "../../Forms/Inputs/PasswordInput";
import RoundedButton from "../../Forms/Inputs/RoundedButton";
import SubTextLink from "../../Forms/SubTextLink";
import SubTextError from "../../Forms/SubTextError";
import RegistrationConfirmation from "../../Confirmations/RegistrationConfirmation";

import http from "../../../axios-configuration";

function RegisterForm() {
  const [errorText, setErrorText] = useState("");
  const [registered, setRegistered] = useState(false);

  const processRegister = (formData) => {
    let fname = formData.fname;
    let lname = formData.lname;
    let email = formData.email;
    let pass = formData.pass;
    let cpass = formData.cpass;

    if (fname.length === 0) {
      setErrorText("Please enter a first name");
      return;
    }

    if (lname.length === 0) {
      setErrorText("Please enter a last name");
      return;
    }

    if (email.length === 0 || !email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setErrorText("Please enter a valid email address");
      return;
    }
  
    if (pass.length < 5 || pass.length > 32) {
      setErrorText("Password must be between 5 and 32 characters");
      return;
    }

    if (pass !== cpass) {
      setErrorText("Passwords do not match");
      return;
    }

    http.post('/accounts/register', formData).then(res => {
      if (res.data.err) {
        setErrorText(res.data.info);
      } else {
        setRegistered(true);
      }
    });
  }

  return (
    registered ? <RegistrationConfirmation/> :
    <Form submitText="REGISTER" process={processRegister}>
      <TextInput name="fname" type="text">First name</TextInput>
      <TextInput name="lname" type="text">Last name</TextInput>
      <TextInput name="email" type="email">Email</TextInput>
      <PasswordInput name="pass">Password</PasswordInput>
      <TextInput name="cpass" type="password">Confirm password</TextInput>
      <RoundedButton colour="green" submit={true}>REGISTER</RoundedButton>
      <SubTextLink textPart1="Already have an account? Click " href="/register" textPart2=" to login"/>
      { errorText.length > 0 ? <SubTextError errorText={errorText}/> : <></> }
    </Form>
  );
}

export default RegisterForm;
