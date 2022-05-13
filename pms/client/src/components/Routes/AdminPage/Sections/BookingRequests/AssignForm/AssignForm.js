import SpacePickerMap from './SpacePickerMap';
import RoundedButton from '../../../../../Forms/Inputs/RoundedButton';
import './AssignForm.css';
import { useEffect, useState } from 'react';
import http from '../../../../../../axios-configuration';
import SubTitle from '../../../../../Shared/SubTitle';
import SubTextError from '../../../../../Forms/SubTextError';

const AssignForm = (props) => {
  const [availableSpaces, setAvailableSpaces] = useState([]);
  const [chosenSpace, setChosenSpace] = useState();
  const [errorText, setErrorText] = useState("");

  let requestData = props.requestData;
  var requestID = requestData._id;
  var location = requestData.location;
  var startTime = new Date(requestData.start_timestamp);
  var endTime = new Date(requestData.end_timestamp);

  useEffect(() => {
    http.get('/admin/spacesbookings').then(res => {
      let available = res.data.filter(entry => {
        if (entry.is_blocked) { return false; }

        if (entry.bookings_count === 0) { return true; }

        // Check if any bookings overlap the requested time
        for (let b in entry.bookings) {
          let bStartTime = new Date(b.start_timestamp);
          let bEndTime = new Date(b.end_timestamp);

          if ((endTime - startTime) + (bEndTime - bStartTime) > (bEndTime - startTime)) {
            return false;
          }
        }

        return true;
      });
      
      setAvailableSpaces(available)
    });
  }, []);

  const assignSpace = () => {
    if (!chosenSpace) {
      setErrorText("Please select a space");
      return;
    }

    http.post('/admin/assignspace', {
      requestID: requestID,
      spaceID: chosenSpace
    }).then(res => {
      if (res.data.err) {
        setErrorText(res.data.info);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <div className="assign-form">
      <SubTitle>{location}</SubTitle>

      <SpacePickerMap availableSpaces={availableSpaces} chosenSpace={chosenSpace} pickSpace={id => setChosenSpace(id)}/>

      <div className="button-section">
        <RoundedButton colour="green" onClick={assignSpace}>CONFIRM</RoundedButton>
        <RoundedButton colour="red" onClick={props.cancel}>CANCEL</RoundedButton>
      </div>

      { errorText.length > 0 ? <SubTextError errorText={errorText}/> : <></> }
    </div>
  );
};

export default AssignForm;
