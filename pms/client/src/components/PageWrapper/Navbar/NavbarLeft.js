import NavbarButton from "./NavbarButton";

function NavbarLeft() {
  return (
    <div className="navbar-left">
      <a className="brand" href="/book">
        <span className="logo"/>
      </a>
      
      <NavbarButton href="/book">Book</NavbarButton>
    </div>
  );
}

export default NavbarLeft;
