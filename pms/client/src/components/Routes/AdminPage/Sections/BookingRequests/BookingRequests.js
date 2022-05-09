import List from "../../Shared/List";
import RequestItem from "./RequestItem";
import AssignForm from "./AssignForm/AssignForm";
import './BookingRequests.css';
import { useState } from "react";

import http from "../../../../../axios-configuration.js";

const BookingRequests = (props) => {
  const [assigning, setAssigning] = useState();

  const assignSpace = (id) => {
    setAssigning(id);
  };
  
  const reject = (id) => {
    
  };

  return (
    <div id="booking-requests">
      <List>
        <RequestItem spaceId={1} assignSpace={assignSpace} reject={reject} location="Sci 2.81" startDate="7:00 27/04/22" endDate="8:00 27/04/22"/>
        <RequestItem spaceId={2} assignSpace={assignSpace} reject={reject} location="Sci 2.81" startDate="7:00 27/04/22" endDate="8:00 27/04/22"/>
        <RequestItem spaceId={3} assignSpace={assignSpace} reject={reject} location="Sci 2.81" startDate="7:00 27/04/22" endDate="8:00 27/04/22"/>
        <RequestItem spaceId={4} assignSpace={assignSpace} reject={reject} location="Sci 2.81" startDate="7:00 27/04/22" endDate="8:00 27/04/22"/>
        <RequestItem spaceId={5} assignSpace={assignSpace} reject={reject} location="Sci 2.81" startDate="7:00 27/04/22" endDate="8:00 27/04/22"/>
      </List>
  
      {assigning ? <AssignForm cancel={() => setAssigning(null)}/> : <></>}
    </div>
  );
};

export default BookingRequests;
