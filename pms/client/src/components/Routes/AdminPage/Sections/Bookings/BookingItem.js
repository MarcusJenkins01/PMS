import ListItem from "../../Shared/ListItem";
import RoundedButton from "../../../../Forms/Inputs/RoundedButton";

const BookingItem = (props) => {
  var startTime = new Date(props.startTime);
  var endTime = new Date(props.endTime);

  return (
    <ListItem
      left={<>
        <span className="email">{props.email}</span>
        <span className="starttime">{startTime.toLocaleString()}</span>
        <span className="endtime">{endTime.toLocaleString()}</span>
      </>}
      right={<>
        <RoundedButton colour="red" hPadding="2.5em" onClick={() => props.moveSpace(props.bookingID)}>Move space</RoundedButton>
      </>}
    />
  );
};

export default BookingItem;
