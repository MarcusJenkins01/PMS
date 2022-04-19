import './Inputs.css';

function TextInput(props) {
  return (
    <div className="input-group">
      <label htmlFor={props.name}>{props.children}</label>
      <input className="text-input" id={props.name} name={props.name} type={props.type}/>
    </div>
  );
}

export default TextInput;
