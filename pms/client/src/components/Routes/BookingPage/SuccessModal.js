import RoundedButton from "../../Forms/Inputs/RoundedButton";

const SuccessModal = (props) => {
  return (
    <div id="success-modal">
      You booking request has been successfully sent; you will receive an email notification once a space has been assigned for you.
      <RoundedButton colour="red" onClick={() => props.setSuccess(false)}>CLOSE</RoundedButton>
    </div>
  )
};

export default SuccessModal;
