import moment from "moment";

const multiply = (hours) => {
  return hours * 3.5;
};

const calcPay = (checkInDate, checkOutDate) => {
  var start = moment(checkInDate);
  var end = moment(checkOutDate); 
  var duration = moment.duration(end.diff(start));
  var hours = duration.asHours().toFixed(2);
  let cost = multiply(hours).toFixed(2);

  return { hours, cost };
};

export default calcPay;
