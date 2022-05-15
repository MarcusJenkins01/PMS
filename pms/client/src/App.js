import { BrowserRouter, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PageWrapper from "./components/PageWrapper/PageWrapper";
import LoginPage from './components/Routes/LoginPage/LoginPage';
import RegisterPage from './components/Routes/RegisterPage/RegisterPage';
import AdminPage from './components/Routes/AdminPage/AdminPage';
import BookingPage from './components/Routes/BookingPage/BookingPage';
import ParkingLotMap from './components/Routes/ParkingLotMap/ParkingLotMap';
import LogoutRoute from './components/Routes/LogoutRoute';
import SpaceConfiguration from './components/Routes/AdminPage/Sections/ParkingLotConfiguration/SpaceConfiguration/SpaceConfiguration';
import ParkingLotConfiguration from './components/Routes/AdminPage/Sections/ParkingLotConfiguration/ParkingLotConfiguration';
import BookingRequests from './components/Routes/AdminPage/Sections/BookingRequests/BookingRequests';
import Bookings from './components/Routes/AdminPage/Sections/Bookings/Bookings';
import Statistics from './components/Routes/AdminPage/Sections/Statistics/Statistics';
import UserManagement from './components/Routes/AdminPage/Sections/UserManagement/UserManagement';
import DriverBooking from './components/Routes/DriverBooking/DriverBooking';
import TicketChat from './components/Routes/TicketSystem/TicketChat';
import ViewTickets from './components/Routes/TicketSystem/ViewTickets';
import TicketSystem from './components/Routes/TicketSystem/TicketSystem';

function App() {
  const [token, setToken] = useState();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem('token') != null) {
      setToken(window.sessionStorage.getItem('token'));
    }

    if (window.sessionStorage.getItem('admin') != null) {
      // sessionStorage stores as a string, so use JSON.parse to convert back to boolean
      setAdmin(JSON.parse(window.sessionStorage.getItem('admin')));
    }
  }, []);

  return (
    <PageWrapper token={token} admin={admin}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage setToken={setToken} setAdmin={setAdmin}/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/book" element={token ? <BookingPage/> : <LoginPage setToken={setToken} setAdmin={setAdmin}/>}/>
          <Route path="/" element={token ? (admin === true ? <AdminPage/> : <BookingPage/>) : <LoginPage setToken={setToken} setAdmin={setAdmin}/>}/>
          <Route path="/logout" element={<LogoutRoute setToken={setToken}/>}/>
          <Route path="/booking/:bookingid" element={token ? <DriverBooking/> : <LoginPage setToken={setToken} setAdmin={setAdmin}/>}/>
          <Route path="/support" element={token ? <TicketSystem/> : <LoginPage setToken={setToken} setAdmin={setAdmin}/>}/>
          <Route path="/tickets" element={token ? <ViewTickets admin={admin}/> : <LoginPage setToken={setToken} setAdmin={setAdmin}/>}/>
          <Route path="/ticket/:ticketid" element={token ? <TicketChat/> : <LoginPage setToken={setToken} setAdmin={setAdmin}/>}/>
          <Route path="/admin" element={token && admin === true ? <AdminPage/> : <BookingPage/>}/>
          <Route path="/admin/lots" element={token && admin === true ? <ParkingLotConfiguration/> : <BookingPage/>}/>
          <Route path="/admin/requests" element={token && admin === true ? <BookingRequests/> : <BookingPage/>}/>
          <Route path="/admin/bookings" element={token && admin === true ? <Bookings/> : <BookingPage/>}/>
          <Route path="/admin/statistics" element={token && admin === true ? <Statistics/> : <BookingPage/>}/>
          <Route path="/admin/users" element={token && admin === true ? <UserManagement/> : <BookingPage/>}/>
          <Route path="/admin/spaces/:lotid" element={token && admin === true ? <SpaceConfiguration/> : <BookingPage/>}/>
        </Routes>
      </BrowserRouter>
    </PageWrapper>
  );
}

export default App;
