import './Bookings.css';
import { useEffect, useState } from "react";
import Title from '../../../../Shared/Title';
import List from '../../Shared/List';
import BookingItem from './BookingItem';
import ListItemEmpty from '../../Shared/ListItemEmpty';

import http from "../../../../../axios-configuration.js";

const Bookings = (props) => {
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    http.get('/admin/bookings').then(res => {
      if (res.data.err) {
        setBookingData({});
        return;
      }

      setBookingData(res.data);
    });
  }, []);

  const moveSpace = (id) => {

  };

  return (
    <div id="bookings">
      <Title>Bookings</Title>

      <List>
        {
          Object.keys(bookingData).length === 0 ? <ListItemEmpty/> :
          Object.keys(bookingData).map((key, i) => {
            let entry = bookingData[key];
            return <BookingItem bookingID={entry._id} moveSpace={moveSpace} userID={entry.user_id} spaceID={entry.space_id} startDate={entry.start_timestamp} endDate={entry.end_timestamp}/>
          })
        }
      </List>
    </div>
  );
};

export default Bookings;
