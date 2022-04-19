import "./Form.css";

function SubTextError(props) {
  return (
    <span className="form-subtext error">{props.errorText}</span>
  )
}

export default SubTextError;
