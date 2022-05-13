import SpacePickerMap from './SpacePickerMap';
import RoundedButton from '../../../../../Forms/Inputs/RoundedButton';
import './AssignForm.css';
import { useEffect, useState } from 'react';
import http from '../../../../../../axios-configuration';
import SubTitle from '../../../../../Shared/SubTitle';

const AssignForm = (props) => {
  const [availableSpaces, setAvailableSpaces] = useState([]);

  let requestData = props.requestData;
  var location = requestData.location;
  var spaceID = requestData.space_id;
  var startTime = new Date(requestData.start_timestamp);
  var endTime = new Date(requestData.end_timestamp);

  console.log(startTime)

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

  return (
    <div className="assign-form">
      <SubTitle>{location}</SubTitle>

      <SpacePickerMap availableSpaces={availableSpaces}/>

      <div className="button-section">
        <RoundedButton colour="green" onClick={() => {}}>Confirm</RoundedButton>
        <RoundedButton colour="red" onClick={props.cancel}>Cancel</RoundedButton>
      </div>
    </div>
  );
};

export default AssignForm;
