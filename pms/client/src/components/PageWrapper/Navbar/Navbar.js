import NavbarLeft from './NavbarLeft';
import NavbarRight from './NavbarRight';
import './Navbar.css';

function Navbar(props) {
  return (
    <div className="navbar">
      <NavbarLeft/>
      <NavbarRight token={props.token} admin={props.admin}/>
    </div>
  );
}

export default Navbar;
