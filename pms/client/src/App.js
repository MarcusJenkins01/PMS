import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';

import PageWrapper from "./components/PageWrapper/PageWrapper";
import LoginPage from './components/Routes/LoginPage/LoginPage';
import RegisterPage from './components/Routes/RegisterPage/RegisterPage';
import AdminPage from './components/Routes/AdminPage/AdminPage';
import BookingPage from './components/Routes/BookingPage/BookingPage';
import ParkingLotMap from './components/Routes/ParkingLotMap/ParkingLotMap';
import AuthRoute from './components/Routes/AuthRoute';

function App() {
  const [token, setToken] = useState();

  return (
    <PageWrapper token={token}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage setToken={setToken}/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/book" element={<AuthRoute token={token}><BookingPage/></AuthRoute>}/>
          <Route path="/" element={token ? <BookingPage/> : <LoginPage setToken={setToken}/>}/>
        </Routes>
      </BrowserRouter>
    </PageWrapper>
  );
}

export default App;
