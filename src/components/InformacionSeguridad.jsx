import { useState } from "react";
import ConfirmarEliminar from "./modals/ConfirmarEliminar";
import CambiarContrasenia from "./modals/CambiarContrasenia";

function InformacionSeguridad() {
  const [showPassword, setShowPassword] = useState(false);
  const fakePassword = "MiContrasena123"; // Texto de ejemplo

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="card-info mx-3 mb-4" style={{ height: "450px" }}>
      <h3 className="fw-bold text-center mb-4">SEGURIDAD</h3>

      <div>
        <h4 style={{ color: "#71717A" }}>Contraseña:</h4>
        <div className="input-group">
          <input
            type="text"
            className="form-control border-0"
            readOnly
            value={showPassword ? fakePassword : "********"}
            style={{
              backgroundColor: "transparent",
              color: "#fff",
              boxShadow: "none",
            }}
          />
          <button
            className="btn btn-outline-light border-0"
            type="button"
            onClick={togglePassword}
            style={{ boxShadow: "none" }}>
            <i
              className={`fa-solid ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}></i>
          </button>
        </div>
      </div>

      <div>
        <h4 style={{ color: "#71717A" }}>Última actualización:</h4>
        <p className="text-white">Hace un mes</p>
      </div>

      <div className="d-flex flex-column align-items-center gap-3 mt-4">
        <button
          className="btn btn-dark w-75"
          data-bs-toggle="modal"
          data-bs-target="#modalCambiarContrasenia">
          CAMBIAR CONTRASEÑA
        </button>

        <button
          className="btn btn-danger w-75"
          data-bs-toggle="modal"
          data-bs-target="#modalEliminarCuenta">
          ELIMINAR CUENTA
        </button>
      </div>

      {/* Modales */}
      <CambiarContrasenia />
      <ConfirmarEliminar />
    </div>
  );
}

export default InformacionSeguridad;
