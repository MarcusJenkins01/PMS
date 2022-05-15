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
    const [closeConfirmID, setCloseConfirmID] = useState();

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

    const closeTicket = (id) => {
      http.post('/tickets/closeticket', ({ ticketID: id })).then(res => {
        window.location.reload();
      });
    };

    const deleteTicket = (id) => {
      http.post('/tickets/deleteticket', ({ ticketID: id })).then(res => {
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
              return <TicketItem userID={entry.email} admin={props.admin} status={entry.status} ticketID={entry._id} userName={entry.userName} closeTicket={setCloseConfirmID} deleteTicket={setConfirmID}/>
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

        { 
          closeConfirmID ?
          <ConfirmModal yes={() => closeTicket(closeConfirmID)} no={() => setCloseConfirmID(null)}>
            Are you sure you want to close this ticket?
          </ConfirmModal>
          : <></>
        }
      </div>
    );
};

export default ViewTickets;