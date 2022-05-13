import ListItem from "../../Shared/ListItem";
import RoundedButton from "../../../../Forms/Inputs/RoundedButton";

const RequestItem = (props) => {
  var startTime = new Date(props.startTime);
  var endTime = new Date(props.endTime);

  return (
    <ListItem
      left={<>
        <span className="location">{props.location}</span>
        <span className="starttime">{startTime.toLocaleString()}</span>
        <span className="endtime">{endTime.toLocaleString()}</span>
      </>}
      right={<>
        <RoundedButton colour="green" hPadding="2.5em" onClick={() => props.assignSpace(props.requestID, props.requestKey)}>Assign space</RoundedButton>
        <RoundedButton colour="red" hPadding="2.5em" onClick={() => props.reject(props.requestID)}>Reject</RoundedButton>
      </>}
    />
  );
};

export default RequestItem;
