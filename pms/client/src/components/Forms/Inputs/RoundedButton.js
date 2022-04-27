import './Inputs.css';

function RoundedButton(props) {
  let styleTag = {padding: `${props.vPadding || "1em"} ${props.hPadding || "5em"}`};
  let classTag = `rounded-button ${props.colour}`;

  if (props.href != null && props.href.trim().length > 0) {
    return (<a style={styleTag} className={classTag} href={props.href}>{props.children}</a>);
  } else if (props.submit != null && props.submit) {
    return (<button type="submit" style={styleTag} className={classTag}>{props.children}</button>);
  }

  return (<button type="button" style={styleTag} className={classTag} onClick={props.onClick}>{props.children}</button>);
}

export default RoundedButton;
