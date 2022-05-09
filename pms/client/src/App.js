import { BrowserRouter, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PageWrapper from "./components/PageWrapper/PageWrapper";
import LoginPage from './components/Routes/LoginPage/LoginPage';
import RegisterPage from './components/Routes/RegisterPage/RegisterPage';
import AdminPage from './components/Routes/AdminPage/AdminPage';
import BookingPage from './components/Routes/BookingPage/BookingPage';
import ParkingLotMap from './components/Routes/ParkingLotMap/ParkingLotMap';
import AuthRoute from './components/Routes/AuthRoute';
import LogoutRoute from './components/Routes/LogoutRoute';
import SpaceConfiguration from './components/Routes/AdminPage/Sections/ParkingLotConfiguration/SpaceConfiguration/SpaceConfiguration';
import ParkingLotConfiguration from './components/Routes/AdminPage/Sections/ParkingLotConfiguration/ParkingLotConfiguration';
import BookingRequests from './components/Routes/AdminPage/Sections/BookingRequests/BookingRequests';
import Statistics from './components/Routes/AdminPage/Sections/Statistics/Statistics';
import UserManagement from './components/Routes/AdminPage/Sections/UserManagement/UserManagement';

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    if (window.sessionStorage.getItem('token') != null) {
      setToken(window.sessionStorage.getItem('token'));
    }
  }, []);

  return (
    <PageWrapper token={token}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage setToken={setToken}/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/book" element={<AuthRoute token={token}><BookingPage/></AuthRoute>}/>
          <Route path="/logout" element={<LogoutRoute setToken={setToken}/>}/>
          <Route path="/" element={token ? <BookingPage/> : <LoginPage setToken={setToken}/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/admin/lots" element={<ParkingLotConfiguration/>}/>
          <Route path="/admin/requests" element={<BookingRequests/>}/>
          <Route path="/admin/statistics" element={<Statistics/>}/>
          <Route path="/admin/users" element={<UserManagement/>}/>
          <Route path="/admin/spaces/:lotid" element={<SpaceConfiguration/>}/>
        </Routes>
      </BrowserRouter>
    </PageWrapper>
  );
}

export default App;
