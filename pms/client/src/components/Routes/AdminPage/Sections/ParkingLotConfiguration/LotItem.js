import ListItem from "../../Shared/ListItem";
import RoundedButton from "../../../../Forms/Inputs/RoundedButton";

const LotItem = (props) => {
  return (
    <ListItem
      left={<>
        <span className="lot-name">{props.lotID}</span>
      </>}
      right={<>
        <RoundedButton colour="green" hPadding="2.5em" onClick={() => props.configureLot(props.lotID)}>Configure</RoundedButton>
        <RoundedButton colour="red" hPadding="2.5em" onClick={() => props.deleteLot(props.lotID)}>Delete</RoundedButton>
      </>}
    />
  );
};

export default LotItem;
