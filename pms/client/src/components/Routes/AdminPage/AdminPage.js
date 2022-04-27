import BookingRequests from './Sections/BookingRequests/BookingRequests';
import ParkingLotConfiguration from './Sections/ParkingLotConfiguration/ParkingLotConfiguration';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-dashboard">
      <ParkingLotConfiguration/>
    </div>
  );
};

export default AdminPage;
