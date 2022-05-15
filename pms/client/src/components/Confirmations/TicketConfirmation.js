import ConfirmationTemplate from "./ConfirmationTemplate";
import { Navigate } from 'react-router-dom';
import { useState } from "react";

const TicketConfirmation = () => {
  const [counter, setCounter] = useState(5);
  setInterval(() => setCounter(counter-1), 1000);

  return (
    (counter <= 0) ? <Navigate to="/book"/> :
    <ConfirmationTemplate title="Ticket successfully logged">
      You will be redirected in {counter} seconds...
    </ConfirmationTemplate>
  );
};

export default TicketConfirmation;
