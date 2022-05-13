const DatetimePicker = (props) => {
  return (
    <div>
      <input type="datetime-local" id={props.name} name={props.name} onChange={(e) => props.setDate(e.target.value)}/>
    </div>
  );
}

export default DatetimePicker;
