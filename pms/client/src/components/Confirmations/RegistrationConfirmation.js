import ConfirmationTemplate from "./ConfirmationTemplate";
import { Navigate } from 'react-router-dom';
import { useState } from "react";

const RegistrationConfirmation = () => {
  const [counter, setCounter] = useState(5);
  setInterval(() => setCounter(counter-1), 1000);

  return (
    (counter <= 0) ? <Navigate to="/login"/> : <ConfirmationTemplate title="Account created">
      You will be redirected in {counter} seconds...
    </ConfirmationTemplate>
  );
};

export default RegistrationConfirmation;
