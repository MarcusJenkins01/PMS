import ListItem from "../../Shared/ListItem";
import RoundedButton from "../../../../Forms/Inputs/RoundedButton";

const RequestItem = (props) => {
  return (
    <ListItem
      left={<>
        <span className="location">{props.location}</span>
        <span className="time">{props.startDate} - {props.endDate}</span>
      </>}
      right={<>
        <RoundedButton colour="green" hPadding="2.5em" onClick={() => props.assignSpace(props.spaceId)}>Assign space</RoundedButton>
        <RoundedButton colour="red" hPadding="2.5em" onClick={() => props.reject(props.spaceId)}>Reject</RoundedButton>
      </>}
    />
  );
};

export default RequestItem;
