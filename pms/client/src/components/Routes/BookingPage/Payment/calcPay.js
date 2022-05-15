import moment from "moment";

const multiply = (hours) => {
  return hours * 3.5;
};

const calcPay = (checkInDate, checkOutDate) => {
  var now = moment(checkInDate); //todays date
  var end = moment(checkOutDate); 
  var duration = moment.duration(now.diff(end));
  var hours = duration.asHours();
  let cost = multiply(hours)

  return { hours, cost };
};

export default calcPay;
