import "./ConfirmationTemplate.css";

const ConfirmationTemplate = (props) => {
  return (
    <div className="card confirmation">
      <h1 className="confirmation-title">{props.title}</h1>
      <p className="confirmation-desc">{props.children}</p>
    </div>
  );
};

export default ConfirmationTemplate;