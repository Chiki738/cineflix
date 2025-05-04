import { Link } from "react-router-dom";
import "../assets/styles/Registro.css";
// import useRegister from "../hooks/useRegister";

function Registro() {
  //   const { formData, handleChange, handleRegister } = useRegister();

  return (
    <div className="formRegistro d-flex flex-column justify-content-center align-items-center text-white text-center p-5">
      <form
        // onSubmit={handleRegister}
        className="d-flex flex-column justify-content-center align-items-center p-4 rounded-2">
        <h3>REGISTRATE</h3>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Ingresar primer nombre"
            className="form-control"
            style={{ width: "300px" }}
            id="name"
            // value={formData.name}
            // onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Ingresar primer apellido"
            className="form-control"
            style={{ width: "300px" }}
            id="lastName"
            // value={formData.lastName}
            // onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Ingresar correo electrónico"
            className="form-control"
            style={{ width: "300px" }}
            id="email"
            // value={formData.email}
            // onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Ingresar contraseña"
            className="form-control"
            style={{ width: "300px" }}
            id="password"
            // value={formData.password}
            // onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="form-control"
            style={{ width: "300px" }}
            id="confirmPassword" // ID diferente para el campo de confirmación
            // value={formData.confirmPassword}
            // onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary px-4 py-1 text-dark fw-bold btnLogin rounded-3 border-success">
          REGISTRARSE
        </button>

        <p className="pb-0">
          ¿Ya tienes una cuenta?&nbsp;
          <Link to="/Login" style={{ color: "white" }}>
            <strong>Iniciar Sesión</strong>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Registro;
