const TicketChatItem = (props) => {
  return (
    <div className="ticket-message">
      <div className="message-header">
        <span className="sender">{props.sender}</span>
      </div>

      <div className="message">
        {props.message}
      </div>
    </div>
  );
};

export default TicketChatItem;
