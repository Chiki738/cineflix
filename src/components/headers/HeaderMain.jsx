import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../assets/styles/HeaderMain.css";
import { logoutUser } from "../../services/logout";
import { Clapperboard, LogOut, Menu, Search, User, X } from "lucide-react";
import { getStoredUser } from "../../utils/storage";

function HeaderMain() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: "/Home", label: "Inicio" },
    { to: "/Peliculas", label: "Películas" },
    { to: "/Series", label: "Series" },
    { to: "/Perfil/Lista", label: "Mi lista" },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate("/Login");
  };

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <nav className="main-header navbar fixed-top px-2 px-sm-3" data-bs-theme="dark">
      <div className="container-fluid hstack gap-3 justify-content-between align-items-center">
        <Link
          to="/Home"
          className="brand-mark navbar-brand mb-0 h1 d-inline-flex align-items-center gap-2">
          <Clapperboard size={30} />
          CineFlix
        </Link>

        <div className="d-none d-lg-flex hstack gap-4 flex-grow-1 align-items-center">
          <ul className="navbar-nav flex-row gap-3">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="vr d-none d-xl-block"></div>

          <form className="search-form d-flex ms-auto" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar títulos"
              aria-label="Buscar títulos"
            />
            <button className="btn btn-ghost d-inline-flex align-items-center gap-2" type="submit">
              <Search size={17} />
              Buscar
            </button>
          </form>
        </div>

        <div className="hstack gap-3">
          <button
            className="navbar-toggler border-0 p-1 d-lg-none"
            type="button"
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className="dropdown">
            <button
              className="profile-button"
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              {user?.foto ? (
                <img src={user.foto} alt="Perfil" />
              ) : (
                <User size={22} />
              )}
            </button>
            <ul className="dropdown-menu dropdown-menu-end app-surface">
              <li>
                <Link to="/Perfil/Informacion" className="dropdown-item d-flex align-items-center gap-2">
                  <User size={16} />
                  Perfil
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="dropdown-item d-flex align-items-center gap-2"
                  type="button">
                  <LogOut size={16} />
                  Salir
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`mobile-drawer ${isOpen ? "is-open" : ""}`}
        tabIndex="-1"
        aria-hidden={!isOpen}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-bold">
            Menú
          </h5>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            aria-label="Cerrar menú"
            onClick={toggleMenu}>
            <X size={20} />
          </button>
        </div>
        <div>
          <ul className="navbar-nav justify-content-end flex-grow-1">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <Link className="nav-link" to={item.to} onClick={handleLinkClick}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <button className="nav-link text-start" type="button" onClick={handleLogout}>
                Salir
              </button>
            </li>
          </ul>

          <form className="d-flex mt-3" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar títulos"
              aria-label="Buscar títulos"
            />
            <button className="btn btn-cine" type="submit" aria-label="Buscar">
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>
      {isOpen && <button className="drawer-backdrop" aria-label="Cerrar menú" onClick={handleLinkClick} />}
    </nav>
  );
}

export default HeaderMain;
