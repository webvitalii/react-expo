import React from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", text: "Home" },
  { to: "/table", text: "Table" },
  { to: "/form", text: "Form" },
  { to: "/carousel", text: "Carousel" },
  { to: "/counter", text: "Counter" },
  { to: "/diff", text: "Diff" },
];

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-center space-x-4">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive
              ? "font-bold px-3 py-2 text-slate-900 rounded-lg bg-slate-200"
              : "font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
          }
        >
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
