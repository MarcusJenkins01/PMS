import RoundedButton from "../../../Forms/Inputs/RoundedButton";
import ButtonSection from "./ButtonSection";
import "./ConfirmModal.css";

const ConfirmModal = (props) => {
  return (
    <div className="confirm-modal">
      <span className="confirm-modal-text">{props.children}</span>

      <ButtonSection>
        <RoundedButton colour="green" onClick={props.yes}>YES</RoundedButton>
        <RoundedButton colour="red" onClick={props.no}>NO</RoundedButton>
      </ButtonSection>
    </div>
  );
};

export default ConfirmModal;
