import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../assets/styles/HeaderMain.css";
import { logoutUser } from "../../services/logout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importante para dropdowns, offcanvas, etc.
import * as bootstrap from "bootstrap";

function HeaderMain() {
  const [user, setUser] = useState(null);

  // Estado para controlar la visibilidad del offcanvas
  const [isOpen, setIsOpen] = useState(false);

  // Función para abrir y cerrar el offcanvas
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden"; // Desactivar el scroll
    } else {
      document.body.style.overflow = "auto"; // Restaurar el scroll
    }
  };

  // Función para manejar el clic en un enlace y cerrar el menú
  const handleLinkClick = () => {
    setIsOpen(false); // Cerrar el menú
    document.body.style.overflow = "auto"; // Restaurar el scroll
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/Login");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const dropdownElements = document.querySelectorAll(".dropdown-toggle");
    dropdownElements.forEach((dropdownToggleEl) => {
      new bootstrap.Dropdown(dropdownToggleEl);
    });
    setUser(storedUser);
  }, []);

  return (
    <nav className="navbar bg-dark fixed-top px-2" data-bs-theme="dark">
      <div className="container-fluid hstack gap-3 justify-content-between align-items-center">
        {/* Logo */}
        <Link
          to="/Home"
          className="navbar-brand mb-0 h1"
          style={{ color: "#3DE3C2", fontWeight: "bold", fontSize: "35px" }}>
          CINEFLIX
        </Link>

        {/* Menú en línea (pantallas grandes) */}
        <div className="d-none d-lg-flex hstack gap-4 flex-grow-1 align-items-center">
          <ul className="navbar-nav flex-row gap-3">
            <li className="nav-item">
              <NavLink
                to="/Home"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Peliculas" className="nav-link">
                Películas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Series" className="nav-link">
                Series
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Perfil/Lista"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }>
                Mi lista
              </NavLink>
            </li>
          </ul>

          {/* Separador */}
          <div className="vr d-none d-xl-block"></div>

          {/* Barra de búsqueda */}
          <form className="d-flex ms-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar..."
            />
            <button className="btnBuscar btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>
        </div>

        {/* Iconos: perfil y botón menú móvil */}
        <div className="hstack gap-3">
          <button
            className="navbar-toggler border-0 p-1 d-lg-none"
            type="button"
            onClick={toggleMenu} // Abre y cierra el menú con un solo clic
            style={{ boxShadow: "none" }}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Perfil con dropdown */}
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <img
                src={user?.foto}
                alt="perfil"
                className="rounded-circle"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link to="/Perfil/Informacion" className="dropdown-item">
                  Perfil <i className="fa-solid fa-user"></i>
                </Link>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="dropdown-item"
                  role="button">
                  Salir <i className="fa-solid fa-right-from-bracket"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Menú lateral móvil */}
      <div
        className={`offcanvas offcanvas-end ${isOpen ? "show" : ""}`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menú
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={toggleMenu}></button>{" "}
          {/* Cierra el menú */}
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <Link className="nav-link" to="/Home" onClick={handleLinkClick}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/Peliculas"
                onClick={handleLinkClick}>
                Películas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Series" onClick={handleLinkClick}>
                Series
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/Perfil/Lista"
                onClick={handleLinkClick}>
                Mi lista
              </Link>
            </li>
          </ul>

          {/* Búsqueda móvil */}
          <form className="d-flex mt-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar..."
            />
            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default HeaderMain;
