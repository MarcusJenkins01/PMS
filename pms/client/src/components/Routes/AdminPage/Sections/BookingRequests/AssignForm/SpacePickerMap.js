import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import SpaceMarker from '../../../../ParkingLotMap/SpaceMarker';
import ListItemEmpty from '../../../Shared/ListItemEmpty';
import './AssignForm.css';

function SpacePickerMap(props) {
  const position = [52.6220843, 1.2398198];

  return (
    <div className="map">
      <MapContainer center={position} zoom={16} scrollWheelZoom={true} style={{ width: "100%", height: '100%', borderRadius: '1em'}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {
          props.availableSpaces.length === 0 ? <ListItemEmpty/> :
          props.availableSpaces.map((entry, i) => {
            return <SpaceMarker onClick={() => props.pickSpace(entry._id)} colour={props.chosenSpace === entry._id ? "pink" : "purple"} 
              spaceName={entry.name} position={[entry.latitude, entry.longitude]}/>
          })
        }
      </MapContainer>
    </div>
  );
}

export default SpacePickerMap;
