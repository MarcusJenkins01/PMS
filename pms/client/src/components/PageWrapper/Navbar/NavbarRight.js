import NavbarButton from "./NavbarButton";

function NavbarRight(props) {
  return (
    <div className="navbar-right">
      {
        props.token ? <>
          {
            props.admin ? <NavbarButton href="/admin">Admin dashboard</NavbarButton>
            : <NavbarButton href="/support">Support</NavbarButton>
          }
          
          <NavbarButton href="/logout">Sign out</NavbarButton>
        </> : <>
          <NavbarButton href="/login">Login</NavbarButton>
          <NavbarButton href="/register">Register</NavbarButton>
        </>
      }
    </div>
  );
}

export default NavbarRight;
