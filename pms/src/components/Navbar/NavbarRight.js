import NavbarButton from "./NavbarButton";

function NavbarRight() {
  return (
    <div className="navbar__right">
      <NavbarButton label="Login" href="/login"/>
      <NavbarButton label="Register" href="/register"/>
    </div>
  );
}

export default NavbarRight;
