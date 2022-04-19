import './Inputs.css';

function RoundedButton(props) {
  if (props.href != null && props.href.trim().length > 0) {
    return (<a className={`rounded-button ${props.colour}`} href={props.href}>{props.children}</a>);
  } else if (props.submit != null && props.submit) {
    return (<button type="submit" className={`rounded-button ${props.colour}`}>{props.children}</button>);
  }

  return (<button type="button" className={`rounded-button ${props.colour}`} onClick={props.onClick}>{props.children}</button>);
}

export default RoundedButton;
