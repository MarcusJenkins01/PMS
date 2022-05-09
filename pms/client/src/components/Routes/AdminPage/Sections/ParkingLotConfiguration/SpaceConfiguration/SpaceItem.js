import ListItem from "../../../Shared/ListItem";
import RoundedButton from "../../../../../Forms/Inputs/RoundedButton";

const SpaceItem = (props) => {
  return (
    <ListItem
      left={<>
        <span className="space-name">{props.spaceName}</span>
      </>}
      right={<>
        {
          props.blocked ?
            <RoundedButton colour="green" hPadding="2.5em" onClick={() => props.unblock(props.spaceID)}>Unblock space</RoundedButton>
          : <RoundedButton colour="red" hPadding="2.5em" onClick={() => props.confirmBlock(props.spaceID)}>Block space</RoundedButton>
        }
        <RoundedButton colour="red" hPadding="2.5em" onClick={() => props.confirmDelete(props.spaceID)}>Delete</RoundedButton>
      </>}
    />
  );
};

export default SpaceItem;
