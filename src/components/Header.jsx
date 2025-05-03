import { Link } from "react-router-dom";
import "../assets/styles/Header.css";

function Header({ children, redirectTo = "/" }) {
  return (
    <header
      className="navbar bg-dark border-bottom border-body px-2 px-sm-3"
      data-bs-theme="dark">
      <Link to={redirectTo}>
        <h1>CINEFLIX</h1>
      </Link>

      {children}
    </header>
  );
}

export default Header;
