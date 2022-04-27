import ListItem from "../../Shared/ListItem";
import RoundedButton from "../../../../Forms/Inputs/RoundedButton";

const LotItem = (props) => {
  return (
    <ListItem
      left={<>
        <span className="lot-name">{props.name}</span>
      </>}
      right={<>
        <RoundedButton colour="green" hPadding="2.5em" onClick={props.configureLot}>Configure</RoundedButton>
        <RoundedButton colour="red" hPadding="2.5em" onClick={props.deleteLot}>Delete</RoundedButton>
      </>}
    />
  );
};

export default LotItem;
