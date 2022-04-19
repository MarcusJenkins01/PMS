import TextInput from "./TextInput";
import { useState } from "react";

function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-group">
      <label htmlFor={props.name}>{props.children}</label>
      <input className="text-input" id={props.name} name={props.name} type={showPassword ? "text" : "password"}/>
      <button className="show-password-button" type="button" onClick={togglePassword}>{showPassword ? "Hide" : "Show"}</button>
    </div>
  );
}

export default PasswordInput;
