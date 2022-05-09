import ListItem from "../../Shared/ListItem";
import RoundedButton from "../../../../Forms/Inputs/RoundedButton";

const LotItem = (props) => {
  let spaceNum = props.spaceNum || 0;

  return (
    <ListItem
      left={<>
        <span className="lot-name">{props.lotName}</span>
        <span className="lot-name">{`${spaceNum} ${spaceNum === 1 ? "space" : "spaces"}`}</span>
      </>}
      right={<>
        <RoundedButton colour="green" hPadding="2.5em" href={`/admin/spaces/${props.lotID}`}>Edit spaces</RoundedButton>
        <RoundedButton colour="red" hPadding="2.5em" onClick={() => props.confirmDelete(props.lotID)}>Delete</RoundedButton>
      </>}
    />
  );
};

export default LotItem;
