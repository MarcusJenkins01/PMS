import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import http from '../../../axios-configuration';
import RoundedButton from '../../Forms/Inputs/RoundedButton';
import ButtonSection from '../AdminPage/Shared/ButtonSection';
import { MapContainer, TileLayer } from 'react-leaflet';
import SpaceMarker from '../ParkingLotMap/SpaceMarker';
import Error from '../../Errors/Error';
import SubTextError from '../../Forms/SubTextError';
import Departed from './Departed';

import './DriverBooking.css';

const DriverBooking = (props) => {
  const [bookingData, setBookingData] = useState({});
  const [userLocation, setUserLocation] = useState();
  const [errorText, setErrorText] = useState("");
  const [arrived, setArrived] = useState(false);
  const [departed, setDeparted] = useState(false);

  let { bookingid } = useParams();

  useEffect(() => {
    http.get(`/bookings/get/${bookingid}`).then(res => {
      if (!res.data.err) {
        setBookingData(res.data);
        setArrived(res.data.arrived);
        setDeparted(res.data.departed);

        navigator.geolocation.getCurrentPosition(pos => {
          let location = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(location);
        });

        navigator.geolocation.watchPosition(pos => {
          let location = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(location);
        });
      }
    })
  }, [bookingid]);

  if (!bookingData.space) {
    return (
      <Error error="Not found">Please contact an admin via the Support page</Error>
    );
  }

  let space = bookingData.space[0];
  let spacePos = [space.latitude, space.longitude];
  let parkingLot = space.parkingLot[0];

  const confirmArrival = () => {
    if (arrived) { return; }

    navigator.geolocation.getCurrentPosition(newestPos => {
      http.post('/bookings/arrived', {
        bookingID: bookingData._id,
        userLocation: { latitude: newestPos.coords.latitude, longitude: newestPos.coords.longitude }
      }).then(res => {
        if (res.data.err) {
          setErrorText(res.data.info);
          return;
        }
  
        setArrived(true);
      });
    }, () => {
      setErrorText("Please allow location services");
      return;
    });
  };

  const confirmDeparture = () => {
    http.post('/bookings/departed', {
      bookingID: bookingData._id
    }).then(res => {
      if (res.data.err) {
        setErrorText(res.data.info);
        return;
      }

      setDeparted(true);
    });
  };

  return (
    departed ? <Departed></Departed> :
    <div id="driver-booking">
      <div id="title-section">
        <span>{parkingLot.name}</span>
        <span>{space.name}</span>
      </div>

      <MapContainer center={spacePos} zoom={16} scrollWheelZoom={true} style={{ width: '100%', height: '40em', borderRadius: '1em'}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        
        { userLocation ? <SpaceMarker spaceName={"You"} colour="red" position={userLocation}/> : <></> }
        <SpaceMarker spaceName={space.name} position={spacePos}/>
      </MapContainer>

      <ButtonSection>
        <RoundedButton hPadding="2.5em" colour={arrived ? "" : "green"} onClick={confirmArrival}>Confirm arrival</RoundedButton>
        <RoundedButton hPadding="2.5em" colour={departed ? "" : "red"} onClick={confirmDeparture}>Confirm departure</RoundedButton>
      </ButtonSection>

      { errorText.length > 0 ? <SubTextError errorText={errorText}/> : <></> }
    </div>
  );
}

export default DriverBooking;
