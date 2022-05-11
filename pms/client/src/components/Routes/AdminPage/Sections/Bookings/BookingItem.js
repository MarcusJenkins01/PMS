import ListItem from "../../Shared/ListItem";
import RoundedButton from "../../../../Forms/Inputs/RoundedButton";

const BookingItem = (props) => {
  return (
    <ListItem
      left={<>
        <span className="location">{props.userID}</span>
        <span className="location">{props.spaceID}</span>
        <span className="time">{props.startDate} - {props.endDate}</span>
      </>}
      right={<>
        <RoundedButton colour="red" hPadding="2.5em" onClick={() => props.moveSpace(props.bookingID)}>Move space</RoundedButton>
      </>}
    />
  );
};

export default BookingItem;
