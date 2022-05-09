import "./ButtonSection.css";

const ButtonSection = (props) => {
  return (
    <div className="button-section">
      {props.children}
    </div>
  );
};

export default ButtonSection;
