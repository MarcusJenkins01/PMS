import { Marker } from 'react-leaflet';
import L from 'leaflet';
import './SpaceMarker.css';

function SpaceMarker(props) {
  const markerIcon = new L.DivIcon({
    className: `marker ${props.colour || "purple"}`,
    iconSize: [32, 51],
    iconAnchor: [16, 51],
    html: `<span class="marker-space-name">${props.spaceName}</span>`
  });

  return (
    <Marker position={props.position}
      key={`marker_${props.spaceID}`}
      icon={markerIcon}
      eventHandlers={{
        mouseover: () => {},
        mouseout: () => {},
        click: props.onClick || (() => {})
      }}
    />
  )
}

export default SpaceMarker;
