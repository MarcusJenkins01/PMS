import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import SpaceMarker from '../../../ParkingLotMap/SpaceMarker';

const position = [52.6220843, 1.2398198];

const SpacesMap = (props) => {
  return (
    <div id="space-map">
      <MapContainer center={position} zoom={16} scrollWheelZoom={true} style={{ width: '100%', height: '500px'}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {
          props.availableData.map(lotSpaces => {
            return lotSpaces.map(space => {
              let mPos = [space.latitude, space.longitude];
              return <SpaceMarker spaceName={space.name} position={mPos}/>
            });
          })
        }

        {
          props.reservedData.map(lotSpaces => {
            return lotSpaces.map(space => {
              let mPos = [space.latitude, space.longitude];
              return <SpaceMarker spaceName={space.name} colour="red" position={mPos}/>
            });
          })
        }
      </MapContainer>
    </div>
  );
};

export default SpacesMap;
