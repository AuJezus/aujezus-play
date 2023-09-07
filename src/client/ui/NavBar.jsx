import NavLink from "./NavLink";
import NavLinkList from "./NavLinkList";

function NavBar() {
  return (
    <nav className="flex justify-between items-center px-10 py-2">
      <img className="w-28" src="/aujezus-play.svg" />

      <NavLinkList>
        <NavLink to="library">Library</NavLink>
        <NavLink to="search">Search</NavLink>
      </NavLinkList>
    </nav>
  );
}

export default NavBar;
