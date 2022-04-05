import './App.css';

import PageContainer from './components/Pages/PageContainer';
import LoginPage from './components/Pages/LoginPage';
import RegisterPage from './components/Pages/RegisterPage';
import AdminPage from './components/Pages/AdminPage';
import BookingPage from './components/Pages/BookingPage';
import ParkingLotMap from './components/Pages/ParkingLotMap/ParkingLotMap';

function App() {
  return (
    <div className="pms">
        <ParkingLotMap/>
    </div>
  );
}

export default App;
