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
    <Form process={processBookingRequest}>
      <TextInput name="location">Destination</TextInput>
      <RoundedButton colour="green" submit={true}>SUBMIT</RoundedButton>
    </Form>
  );
}

export default BookingForm;
