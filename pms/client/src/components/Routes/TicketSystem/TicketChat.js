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
  const [messageContent, setMessageContent] = useState("");

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

  const sendMessage = () => {
    if (ticketData._id == null) { return; }
    if (messageContent.length === 0) { return; }

    http.post('/tickets/message', ({ ticketID: ticketData._id, message: messageContent })).then(res => {
      window.location.reload();
    });
  };

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
            return <TicketChatItem sender={entry.admin ? "Admin" : ticketData.name} message={entry.message}/>
          })
        }
      </List>

      <div id="message-input-section">
        <textarea name="message" cols="40" rows="5" onChange={(e) => setMessageContent(e.target.value)}></textarea>
        <RoundedButton colour={messageContent.length > 0 ? "green" : ""} onClick={sendMessage}>Send</RoundedButton>
      </div>
    </div>
  );
};

export default TicketChat;
