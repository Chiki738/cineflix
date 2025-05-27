import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      className="navbar bg-dark border-bottom border-body px-2 px-sm-3"
      data-bs-theme="dark">
      <Link to={"/"} className="text-decoration-none">
        <h1 style={{ color: "#3DE3C2" }} className="display-6 fw-bold mb-0">
          CINEFLIX
        </h1>
      </Link>
    </header>
  );
}

export default Header;
