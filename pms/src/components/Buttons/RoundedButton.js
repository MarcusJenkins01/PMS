function RoundedButton(props) {
  return (
    () => {
      if (props.href.trim().length > 0) {
        return <a className={`rounded-button ${props.colour}`} href={props.href}>{props.text}</a>
      } else if (props.submit) {
        return <button type="submit" className={`rounded-button ${props.colour}`}>{props.text}</button>
      } else {
        return <button type="button" className={`rounded-button ${props.colour}`} onClick={props.onClick}>{props.text}</button>
      }
    }
  );
}

export default RoundedButton;
