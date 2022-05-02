import BookingRequests from './Sections/BookingRequests/BookingRequests';
import ParkingLotConfiguration from './Sections/ParkingLotConfiguration/ParkingLotConfiguration';
import Statistics from './Sections/Statistics/Statistics';

import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-dashboard">
      <ParkingLotConfiguration/>
    </div>
  );
};

export default AdminPage;
