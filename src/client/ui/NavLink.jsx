import { NavLink as NavLinkRouter } from "react-router-dom";

function NavLink({ children }) {
  return (
    <li className="transition-colors duration-300 text-neutral-400 font-bold text-lg hover:text-neutral-50">
      <NavLinkRouter>{children}</NavLinkRouter>
    </li>
  );
}

export default NavLink;
