import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/logout";
import { Clapperboard, LogOut } from "lucide-react";

function HeaderAdmin() {
  const navigate = useNavigate();
  const items = [
    { to: "/PeliculasAdmin", label: "Películas" },
    { to: "/SeriesAdmin", label: "Series" },
    { to: "/Analisis", label: "Análisis" },
    { to: "/UsuariosAdmin", label: "Usuarios" },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate("/Login");
  };

  return (
    <nav className="navbar navbar-expand-lg main-header">
      <div className="container-fluid">
        <NavLink to="/PeliculasAdmin" className="brand-mark navbar-brand d-inline-flex align-items-center gap-2">
          <Clapperboard size={30} />
          CineFlix Admin
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
            {items.map((item) => (
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
          <button onClick={handleLogout} className="btn btn-ghost d-inline-flex align-items-center gap-2 m-0 ms-3">
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default HeaderAdmin;
