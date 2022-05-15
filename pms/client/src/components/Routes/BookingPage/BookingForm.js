import Form from "../../Forms/Form";
import TextInput from "../../Forms/Inputs/TextInput";
import RoundedButton from "../../Forms/Inputs/RoundedButton";
import SubTextError from "../../Forms/SubTextError";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./Payment/Checkout";

import TableDatePicker from "./DateTimePicker";

import http from "../../../axios-configuration";

const MIN_BOOKING_TIME = 60 * 60 * 1000;  // 1 hour in milliseconds
const MAX_BOOKING_TIME = 10 * 24 * 60 * 60 * 1000;  // 10 days in milliseconds

function BookingForm(props) {
  const [errorText, setErrorText] = useState("");
  const [checkInDate, setcheckInDate] = useState(null);
  const [checkOutDate, setcheckOutDate] = useState(null);

  const processBookingRequest = (formData) => {
    if (formData.location.length === 0) {
      setErrorText("Please enter a destination");
      return;
    }
  
    if (formData.location.length > 100) {
      setErrorText("Destination is too long (max 100)");
      return;
    }

    if (checkInDate == null) {
      setErrorText("Please pick a start date and time");
      return;
    }

    if (checkOutDate == null) {
      setErrorText("Please pick an end date and time");
      return;
    }

    let postData = { ...formData, starttime: checkInDate, endtime: checkOutDate };

    console.log(checkInDate);
    console.log(postData)

    if (checkInDate.getTime() < Date.now()) {
      setErrorText("Please enter a start time and date in the future");
      return;
    }

    if (checkOutDate - checkInDate < MIN_BOOKING_TIME) {
      setErrorText("You must book at least 1 hour");
      return;
    }

    if (checkOutDate - checkInDate > MAX_BOOKING_TIME) {
      setErrorText("You can only book up to 10 days");
      return;
    }

    http.post('/bookings/make', postData).then(res => {
      if (res.data.err) {
        setErrorText(res.data.info);
      } else {
        setErrorText("");
      }
    });
  }
  
  return (
    <Form process={processBookingRequest}>
      <TextInput name="location">Destination</TextInput>
      {/* <DatetimePicker setDate={setStartDate} name="starttime" ></DatetimePicker>
      <DatetimePicker setDate={setEndDate} name="endtime"></DatetimePicker> */}
      
      <TableDatePicker checkInDate={checkInDate} setcheckInDate={setcheckInDate} checkOutDate={checkOutDate} setcheckOutDate={setcheckOutDate}/>

      <PayPalScriptProvider
       options={{"client-id": "AcWK911Waq9ZCzo3AzwJjcYTqQtesHPgsxIwo24tjqRpBoBtbdIHYl_AcgHiirtf0aNA5U53BeycgSFk"}}
       >
         <div className="checkout">
          {<Checkout />}
        </div>
       </PayPalScriptProvider>
      
      <RoundedButton colour="green" submit={true}>SUBMIT</RoundedButton>
      { errorText.length > 0 ? <SubTextError errorText={errorText}/> : <></> }
    </Form>
  );
}

export default BookingForm;
