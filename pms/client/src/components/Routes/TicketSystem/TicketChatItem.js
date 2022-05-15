import ListItem from "./Shared/ListItem";
import RoundedButton from "../../Forms/Inputs/RoundedButton";

const TicketItem = (props) => {
  console.log(props)
  return (
    <ListItem
      left={<>
        <span className="user-id">{props.email}</span>
        <span className="message">{props.message}</span>
      </>}
      right={<>
        <RoundedButton colour="green" hPadding="2.5em" href={`/tickets/list/${props.ticketID}`}>Send message</RoundedButton>
      </>}
    />
  );
};

// Haven't worked on this, just thought a new item was needed for the messages.

export default TicketItem;