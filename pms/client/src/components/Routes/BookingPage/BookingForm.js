import Form from "../../Forms/Form";
import TextInput from "../../Forms/Inputs/TextInput";
import RoundedButton from "../../Forms/Inputs/RoundedButton";
import SubTextLink from "../../Forms/SubTextLink";
import SubTextError from "../../Forms/SubTextError";
import { useState } from "react";

import http from "../../../axios-configuration";

function BookingForm(props) {
  const [errorText, setErrorText] = useState("");
  const [success, setSuccess] = useState(false);

  const processBookingRequest = (formData) => {
    http.post('/bookings/login', formData).then(res => {
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
    <Form submitText="LOGIN" process={processBookingRequest}>
      <TextInput name="email" type="email">Email</TextInput>
      <PasswordInput name="pass">Password</PasswordInput>
      <RoundedButton colour="green" submit={true}>LOGIN</RoundedButton>
      <SubTextLink textPart1="Don't have an account? Click " href="/register" textPart2=" to register"/>
      { errorText.length > 0 ? <SubTextError errorText={errorText}/> : <></> }
    </Form>
  );
}

export default BookingForm;
