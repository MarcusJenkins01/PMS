import NavbarButton from "./NavbarButton";

function NavbarRight(props) {
  return (
    props.token ? <NavbarButton href="/logout">Sign out</NavbarButton> :
    <div className="navbar-right">
      <NavbarButton href="/login">Login</NavbarButton>
      <NavbarButton href="/register">Register</NavbarButton>
    </div>
  );
}

export default NavbarRight;
