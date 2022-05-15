import Form from "../../Forms/Form";
import TextInput from "../../Forms/Inputs/TextInput";
import RoundedButton from "../../Forms/Inputs/RoundedButton";
import { useState } from "react";
import TicketConfirmation from "../../Confirmations/TicketConfirmation";
import http from "../../../axios-configuration";
import SubTextError from "../../Forms/SubTextError";
import SubTextLink from "../../Forms/SubTextLink";
import { Navigate } from "react-router";

import './TicketSystem.css';

function TicketSystem () {
  const [errorText, setErrorText] = useState("");
  const [ticketID, setTicketID] = useState(null);

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
      }

      setTicketID(res.data.ticketID);
    });
  };

  return (
    <div id="ticket-system">
      {
      ticketID ? <Navigate to={`/ticket/${ticketID}`}/>:
      <Form process={SubmitTicket}>
        <TextInput name="name" type="text">What should we call you?</TextInput>
        <TextInput name="message" type="text">How can we help?</TextInput>
        <RoundedButton colour="green" submit={true}>SEND</RoundedButton>
        
        <SubTextLink textPart1="Already have a ticket? Click " href="/tickets" textPart2=" to view your tickets"/>
        { errorText.length > 0 ? <SubTextError errorText={errorText}/> : <></> }
      </Form>
      }
    </div>
  );
}

export default TicketSystem;