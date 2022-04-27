import SpacePickerMap from './SpacePickerMap';
import RoundedButton from '../../../../../Forms/Inputs/RoundedButton';
import './AssignForm.css';

const AssignForm = (props) => {
  return (
    <div className="assign-form">
      <SpacePickerMap/>

      <div className="button-section">
        <RoundedButton colour="green">Confirm</RoundedButton>
        <RoundedButton colour="red" onClick={props.cancel}>Cancel</RoundedButton>
      </div>
    </div>
  );
};

export default AssignForm;
