import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./DateTimePicker.css"
import "react-datepicker/dist/react-datepicker.css";

function TableDatePicker (props) {
  // define change function on check in date
  const handleCheckInDate = (date) => {
      props.setcheckInDate(date);
      props.setcheckOutDate(null);
  };
  // define change function on check out date
  const handleCheckOutDate = (date) => {
    props.setcheckOutDate(date);
  };

  const multiply = (hours) => {
    return hours * 3.5;
  };
 
  const calcPay = (checkInDate, checkOutDate) => {
    var now = moment(checkInDate); //todays date
    var end = moment(checkOutDate); 
    var duration = moment.duration(now.diff(end));
    var hours = duration.asHours();
    let cost = multiply(hours)
    console.log("hours stayed: ",hours)
    console.log("price: ", cost)
  };

  return (
    <div className="datepicker">
        <div className="input-container">
            <div>
                <label>Check In</label>
                <DatePicker
                placeholderText="Select Start Date"
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mmaa"
                selected={props.checkInDate}
                minDate={new Date()}
                onChange={handleCheckInDate}
                />
            </div>
            <div>
                <label>Check out</label>
                <DatePicker
                placeholderText="Select End Date"
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mmaa"
                selected={props.checkOutDate}
                minDate={props.checkInDate}
                onChange={handleCheckOutDate}
                />
            </div>
        </div>
    
        {props.checkInDate && props.checkOutDate && calcPay(props.checkInDate, props.checkOutDate) && (
            <div className="summary">
            <p>
                You have booked a space from {moment(props.checkInDate).format("LL")} 
                to{" "} {moment(props.checkOutDate).format("LL")}.
            </p>
            <p>
              You have stayed for {calcPay(props.checkInDate, props.checkOutDate).format("H HH")} 
            </p>
            
        </div>
        )}
    </div>
  );
 }

 export default TableDatePicker;