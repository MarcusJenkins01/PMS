function NavbarButton(props) {
  return (
    <a className="navbar-button" href={props.href}>{props.children}</a>
  );
}

export default NavbarButton;
