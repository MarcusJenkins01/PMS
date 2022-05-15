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
  const [assigning, setAssigning] = useState({});

  const assignSpace = (id, key) => {
    setAssigning({ id, key });
  };
  
  const reject = (id) => {
    http.post('/admin/rejectrequest', { requestID: id }).then(() => {
      window.location.reload();
    });
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
          Object.keys(requestData).map(key => {
            let entry = requestData[key];

            return <RequestItem requestID={entry._id} requestKey={key} assignSpace={assignSpace} reject={reject}
              location={entry.location} startTime={entry.start_timestamp} endTime={entry.end_timestamp}/>
          })
        }
      </List>
  
      {assigning.id && assigning.key ? <AssignForm requestID={assigning.id}
        requestData={requestData[assigning.key]} cancel={() => setAssigning({})}/> : <></>}
    </div>
  );
};

export default BookingRequests;
