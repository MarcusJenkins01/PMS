import List from "./Shared/List";
import TicketItem from "./TicketItem";
import Title from "../../Shared/Title";
import ConfirmModal from "./Shared/ConfirmModal";

import { useEffect, useState } from "react";

import http from "../../../axios-configuration";
import "./TicketSystem.css";

const ViewTickets = (props) => {
    const [ticketData, setTicketData] = useState({});
    const [confirmID, setConfirmID] = useState();

    useEffect(() => {
      http.get("/tickets/list/").then(res => {
        console.log(res.data)
        if (res.data.err){
          setTicketData({});
          return;
        }

        setTicketData(res.data);
      })
    }, [])

    const deleteTicket = (id) => {
      http.post('tickets/deleteticket', ({ ticketID: id })).then(res => {
        console.log(res)
        window.location.reload();
      });
  }

    return(
      <div id="view-tickets">
        <Title>Tickets</Title>

        <List>
          {
            Object.keys(ticketData).map((key, i) => {
              let entry = ticketData[key];
              return <TicketItem userID={entry.email} status={entry.status} ticketID={entry._id} userName={entry.userName} deleteTicket={setConfirmID}/>
            })
          }
        </List>

        { 
        confirmID ?
        <ConfirmModal yes={() => deleteTicket(confirmID)} no={() => setConfirmID(null)}>
          Are you sure you want to delete this ticket?
        </ConfirmModal>
        : <></>
      }
      </div>
    );
};

export default ViewTickets;