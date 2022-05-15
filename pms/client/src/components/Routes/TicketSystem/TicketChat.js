import List from "./Shared/List";
import TicketChatItem from "./TicketChatItem";
import Title from "../../Shared/Title";
import ConfirmModal from "./Shared/ConfirmModal";
import Error from "../../Errors/Error";

import { useEffect, useState } from "react";
import { useParams } from "react-router";

import http from "../../../axios-configuration";
import "./TicketSystem.css";
import TextInput from "../../Forms/Inputs/TextInput";
import RoundedButton from "../../Forms/Inputs/RoundedButton";

const TicketChat = (props) => {
  const [ticketData, setTicketData] = useState({});
  const [confirmID, setConfirmID] = useState();

  let { ticketid } = useParams();

  useEffect(() => {
    http.get(`/tickets/get/${ticketid}`).then(res => {
      console.log(res)
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

  if (!ticketData.ticketChats) {
    return (
      <Error error="Ticket not found">Please contact an admin via the Support page</Error>
    );
  }

  return(
    <div id="ticket-chat">
      <Title>Ticket {ticketData._id}</Title>
      
      <div id="ticket-op">
        <div id="top-section">
          <div id="left">
            <span>{ticketData.name}</span>
            <span>{ticketData.email}</span>
          </div>

          <div id="right">
            <span>{ticketData.status}</span>
          </div>
        </div>

        <div id="message">
          {ticketData.message}
        </div>
      </div>

      <List>
        {
          ticketData.ticketChats.map(entry => {
            return <TicketChatItem userID={entry.admin ? "Admin" : ticketData.name} message={entry.message} deleteTicket={setConfirmID}/>
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

      <div id="message-input-section">
        <textarea name="message" cols="40" rows="5"></textarea>
        <RoundedButton colour="green">Send</RoundedButton>
      </div>
    </div>
  );
};

export default TicketChat;
