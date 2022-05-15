import Checkout from "./Checkout";
import PaypalCheckoutButton from "./PaypalCheckoutButton";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useParams } from "react-router";
import http from "../../../axios-configuration";
import { useState, useEffect } from "react";

import './MakePayment.css';

const MakePayment = (props) => {
  const [bookingData, setBookingData] = useState({});

  let { bookingid } = useParams();

  useEffect(() => {
    http.get(`/bookings/pricedata/${bookingid}`).then(res => {
      if (!res.data.err) {
        setBookingData(res.data);
      }
    });
  }, [bookingid]);

  if (!bookingData.start_timestamp) {
    return <></>
  }

  return (
    <PayPalScriptProvider
      options={{"client-id": "AcWK911Waq9ZCzo3AzwJjcYTqQtesHPgsxIwo24tjqRpBoBtbdIHYl_AcgHiirtf0aNA5U53BeycgSFk"}}
      >
      { <Checkout bookingID={bookingid} checkInDate={bookingData.start_timestamp} checkOutDate={bookingData.end_timestamp}/> }
    </PayPalScriptProvider>
  );
}

export default MakePayment;
