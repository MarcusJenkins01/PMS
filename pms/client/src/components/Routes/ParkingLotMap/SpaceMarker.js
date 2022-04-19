import { Marker } from 'react-leaflet';
import L from 'leaflet';
import './SpaceMarker.css';

function SpaceMarker(props) {
  const markerIcon = new L.DivIcon({
    className: 'marker',
    iconSize: [32, 51],
    iconAnchor: [16, 51],
    html: `<span class="marker-space-id">${props.spaceId}</span>`
  });

  return (
    <Marker position={props.position}
      key={`marker_${props.spaceId}`}
      icon={markerIcon}
      eventHandlers={{
        mouseover: () => {},
        mouseout: () => {}
      }}
    />
  )
}

export default SpaceMarker;
