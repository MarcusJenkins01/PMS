import List from "../../Shared/List";
import RequestItem from "./RequestItem";
import AssignForm from "./AssignForm/AssignForm";
import './BookingRequests.css';
import { useEffect, useState } from "react";
import Title from '../../../../Shared/Title';
import ListItemEmpty from "../../Shared/ListItemEmpty";

import http from "../../../../../axios-configuration.js";

const BookingRequests = (props) => {
  const [requestData, setRequestData] = useState({});
  const [assigning, setAssigning] = useState();

  const assignSpace = (id) => {
    setAssigning(id);
  };
  
  const reject = (id) => {
    
  };

  useEffect(() => {
    http.get('/admin/bookingrequests').then(res => {
      if (res.data.err) {
        setRequestData({});
        return;
      }

      setRequestData(res.data);
    });
  }, []);

  return (
    <div id="booking-requests">
      <Title>Booking requests</Title>

      <List>
        {
          Object.keys(requestData).length === 0 ? <ListItemEmpty/> :
          Object.keys(requestData).map((key, i) => {
            let entry = requestData[key];
            return <RequestItem spaceId={1} assignSpace={assignSpace} reject={reject} location={entry.location} startDate={entry.start_timestamp} endDate={entry.end_timestamp}/>
          })
        }
      </List>
  
      {assigning ? <AssignForm cancel={() => setAssigning(null)}/> : <></>}
    </div>
  );
};

export default BookingRequests;
