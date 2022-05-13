import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import http from '../../../axios-configuration';
import './DriverBooking.css';

const DriverBooking = (props) => {
  const [bookingData, setBookingData] = useState({});

  let { bookingid } = useParams();

  useEffect(() => {
    http.get(`/bookings/get/${bookingid}`).then(res => {
      if (!res.data.err) {
        setBookingData(res.data);
      }
    });
  }, []);

  console.log(bookingData)

  return (
    <div>
      
    </div>
  );
}

export default DriverBooking;
