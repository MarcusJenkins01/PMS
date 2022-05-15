import ListItem from "./Shared/ListItem";
import RoundedButton from "../../Forms/Inputs/RoundedButton";

const TicketItem = (props) => {
  return (
    <ListItem
      left={<>
        <span className="user-id">{props.userID}</span>
        <span className="ticket-id">{`Ticket ID: ${props.ticketID}`}</span>
        <span className="user-name">{props.userName}</span>
        <span className="message">{props.message}</span>
        <span className="status">{`Status: ${props.status}`}</span>
      </>}
      right={<>
        <RoundedButton colour="green" hPadding="2.5em" href={`/ticket/${props.ticketID}`}>View ticket</RoundedButton>
        <RoundedButton colour="red" hPadding="2.5em" onClick={() => props.deleteTicket(props.ticketID)}>Delete ticket</RoundedButton>
      </>}
    />
  );
};

export default TicketItem;
