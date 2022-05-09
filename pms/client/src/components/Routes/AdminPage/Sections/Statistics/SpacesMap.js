import { MapContainer, TileLayer, Popup } from 'react-leaflet';

const position = [52.6220843, 1.2398198];

const SpacesMap = () => {
  return (
    <div id="space-map">
      <MapContainer center={position} zoom={16} scrollWheelZoom={true} style={{ width: '100%', height: '500px'}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
      </MapContainer>
    </div>
  );
};

export default SpacesMap;
