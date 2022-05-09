import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import SpaceMarker from '../../../../ParkingLotMap/SpaceMarker';
import './AssignForm.css';

function SpacePickerMap(props) {
  const position = [52.6220843, 1.2398198];

  return (
    <div className="map">
      <MapContainer center={position} zoom={16} scrollWheelZoom={true} style={{ width: "100%", height: '100%'}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
          
        <SpaceMarker position={[52.6232104, 1.2413629]} spaceId="A01">
        </SpaceMarker>
      </MapContainer>
    </div>
  );
}

export default SpacePickerMap;