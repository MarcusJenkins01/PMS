import "./Form.css";

function SubTextLink(props) {
  return (
    <span className="form-subtext link">{props.textPart1}<a href={props.href}>here</a>{props.textPart2}</span>
  )
}

export default SubTextLink;
