import { useState } from 'react';
import { MapContainer, TileLayer, Popup, useMapEvent } from 'react-leaflet';
import RoundedButton from '../../../../../Forms/Inputs/RoundedButton';
import SpaceMarker from '../../../../ParkingLotMap/SpaceMarker';
import SubTextError from '../../../../../Forms/SubTextError';
import Form from '../../../../../Forms/Form';

import http from '../../../../../../axios-configuration';
import TextInput from '../../../../../Forms/Inputs/TextInput';

const position = [52.6220843, 1.2398198];

const PositionMarker = (props) => {
  const map = useMapEvent('click', (e) => {
    let pos = [e.latlng.lat, e.latlng.lng];
    props.setPosition(pos);
  });

  return props.clickedPos.length === 2 ? <SpaceMarker position={props.clickedPos} spaceName={""}/> : <></>;
}

const AddSpace = (props) => {
  const [clickedPos, setClickedPos] = useState([]);
  const [errorText, setErrorText] = useState("");

  const addSpace = (formData) => {
    if (clickedPos.length !== 2) {
      setErrorText("Please choose a location");
      return;
    }

    if (formData.name.length === 0) {
      setErrorText("Please enter a name/identifier");
      return;
    }

    if (formData.name.length > 3) {
      setErrorText("Max name/identifier length is 3");
      return;
    }

    http.post('/admin/addspace', {
      name: formData.name,
      lotID: props.lotID,
      latitude: clickedPos[0],
      longitude: clickedPos[1]
    }).then(res => {
      if (res.data.err === true) {
        setErrorText(res.data.info);
        return;
      }

      window.location.reload();
    });
  };

  return (
    <div id="add-space-modal">
        <Form process={addSpace} disableStyling={true}>
          <TextInput name="name">Space name/identifier:</TextInput>

          <MapContainer center={position} zoom={16} scrollWheelZoom={true} style={{ width: "100%", height: "100%", borderRadius: "0.5em", marginTop: "1em" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />

            {
              Object.keys(props.spaceData).map((key, i) => {
                let entry = props.spaceData[key];
                let mPos = [entry.latitude, entry.longitude];

                return <SpaceMarker spaceName={entry.name} colour="red" position={mPos}/>
              })
            }

            <PositionMarker setPosition={setClickedPos} clickedPos={clickedPos}/>
          </MapContainer>

          <div className="button-section">
            <RoundedButton colour="green" submit={true}>CONFIRM</RoundedButton>
            <RoundedButton colour="red" onClick={props.close}>CANCEL</RoundedButton>
          </div>

          { errorText.length > 0 ? <SubTextError errorText={errorText}/> : <></> }
        </Form>
    </div>
  );
};

export default AddSpace;
