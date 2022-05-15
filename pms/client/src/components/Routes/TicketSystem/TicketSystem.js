import Form from "../../Forms/Form";
import TextInput from "../../Forms/Inputs/TextInput";
import RoundedButton from "../../Forms/Inputs/RoundedButton";
import { useState } from "react";
import TicketConfirmation from "../../Confirmations/TicketConfirmation";
import http from "../../../axios-configuration";
import SubTextError from "../../Forms/SubTextError";


function TicketSystem () {
  const [errorText, setErrorText] = useState("");
  const [success, setSuccess] = useState(false);

  const SubmitTicket = (ticketData) => {
    let name = ticketData.name;
    let message = ticketData.message;

    if (message === "" || name === ""){
      setErrorText("All fields must contain valid text!")
      return;
    }

    http.post('/tickets/submit', ticketData).then(res => {
      if (res.data.err) {
        setErrorText(res.data.info);
        return;
      } else {
        setSuccess(true);
      }
    });

    console.log(ticketData);
  };

  return (
    success ? <TicketConfirmation/>:
    <Form process={SubmitTicket}>
      <TextInput name="name" type="text">What should we call you?</TextInput>
      <TextInput name="message" type="text">How can we help?</TextInput>
      <RoundedButton colour="green" submit={true}>SEND</RoundedButton>

      { errorText.length > 0 ? <SubTextError errorText={errorText}/> : <></> }
    </Form>
  );
}

export default TicketSystem;