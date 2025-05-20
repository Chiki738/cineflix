import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/logout";

function HeaderAdmin() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "white" : "gray",
    textDecoration: "none",
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/Login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <NavLink to="/PeliculasAdmin" style={{ textDecoration: "none" }}>
          <h1
            className="me-3"
            style={{ color: "#3DE3C2", fontWeight: "bold", marginBottom: 0 }}>
            CINEFLIX
          </h1>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/PeliculasAdmin"
                style={linkStyle}
                className="nav-link">
                Peliculas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/SeriesAdmin" style={linkStyle} className="nav-link">
                Series
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Analisis" style={linkStyle} className="nav-link">
                Analisis
              </NavLink>
            </li>
          </ul>
          <button onClick={handleLogout} className="btn text-white m-0 ms-3">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default HeaderAdmin;
