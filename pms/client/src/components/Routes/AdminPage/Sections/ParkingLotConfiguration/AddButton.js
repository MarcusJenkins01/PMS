const AddButton = (props) => {
  return (
    <button className="add-button" type="button" onClick={() => props.stateFunction(true)}>ADD</button>
  );
};

export default AddButton;
