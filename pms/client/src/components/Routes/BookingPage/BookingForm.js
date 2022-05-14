import Form from "../../Forms/Form";
import TextInput from "../../Forms/Inputs/TextInput";
import RoundedButton from "../../Forms/Inputs/RoundedButton";
import SubTextError from "../../Forms/SubTextError";
import { useState } from "react";
import DatetimePicker from "./DatetimePicker";

import http from "../../../axios-configuration";

const MIN_BOOKING_TIME = 60 * 60 * 1000;  // 1 hour in milliseconds
const MAX_BOOKING_TIME = 10 * 24 * 60 * 60 * 1000;  // 10 days in milliseconds

function BookingForm(props) {
  const [errorText, setErrorText] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  //const [completed, setCompleted] = useState(false);

  const processBookingRequest = (formData) => {
    if (formData.location.length === 0) {
      setErrorText("Please enter a destination");
      return;
    }
  
    if (formData.location.length > 100) {
      setErrorText("Destination is too long (max 100)");
      return;
    }

    if (startDate == null) {
      setErrorText("Please pick a start date and time");
      return;
    }

    if (endDate == null) {
      setErrorText("Please pick an end date and time");
      return;
    }

    let start = new Date(startDate);
    let end = new Date(endDate)

    if (start.getTime() < Date.now()) {
      setErrorText("Please enter a start time and date in the future");
      return;
    }

    if (end - start < MIN_BOOKING_TIME) {
      setErrorText("You must book at least 1 hour");
      return;
    }

    if (end - start > MAX_BOOKING_TIME) {
      setErrorText("You can only book up to 10 days");
      return;
    }

    http.post('/bookings/make', formData).then(res => {
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
      <DatetimePicker setDate={setStartDate} name="starttime" ></DatetimePicker>
      <DatetimePicker setDate={setEndDate} name="endtime"></DatetimePicker>
      <RoundedButton colour="green" submit={true}>SUBMIT</RoundedButton>
      { errorText.length > 0 ? <SubTextError errorText={errorText}/> : <></> }
    </Form>
  );
}

export default BookingForm;
