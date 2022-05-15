import ListItem from "./Shared/ListItem";
import RoundedButton from "../../Forms/Inputs/RoundedButton";

const TicketChatItem = (props) => {
  return (
    <div className="ticket-message">
      <div className="message-header">
        <span className="user-id">{props.email}</span>
      </div>

      <div className="message">
        {props.message}
      </div>
    </div>
  );
};

export default TicketChatItem;
