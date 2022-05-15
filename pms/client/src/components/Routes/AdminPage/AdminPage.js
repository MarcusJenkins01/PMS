import './AdminPage.css';

const AdminPage = () => {
  return (
    <div id="admin-dashboard">
      <a href="/admin/lots" className="selection-button">Parking lot configuration</a>
      <a href="/admin/requests" className="selection-button">Booking requests</a>
      <a href="/admin/bookings" className="selection-button">Bookings</a>
      <a href="/admin/statistics" className="selection-button">Statistics</a>
      <a href="/admin/users" className="selection-button">User management</a>
      <a href="/tickets" className="selection-button">Tickets</a>
    </div>
  );
};

export default AdminPage;
