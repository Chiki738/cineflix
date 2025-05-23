import React, { useState, useEffect } from "react";

function InformacionSeguridad() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [fechaActualizacion, setFechaActualizacion] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setPassword(user.contrasena || "");
      if (user.fecha_actualizacion_contrasena) {
        setFechaActualizacion(new Date(user.fecha_actualizacion_contrasena));
      }
    }
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  const formatoFecha = (fecha) => {
    if (!fecha) return "No disponible";
    return fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="card-info mx-3 mb-4" style={{ height: "450px" }}>
      <h3 className="fw-bold text-center mb-4">SEGURIDAD</h3>

      <div>
        <h4 style={{ color: "#71717A" }}>Contraseña:</h4>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control border-0"
            readOnly
            value={password || ""}
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

      <div className="mt-4">
        <h4 style={{ color: "#71717A" }}>Última actualización:</h4>
        <p className="text-white">{formatoFecha(fechaActualizacion)}</p>
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
          data-bs-target="#modalEliminar">
          ELIMINAR CUENTA
        </button>
      </div>

      {/* Aquí puedes incluir los modales si los implementas */}
    </div>
  );
}

export default InformacionSeguridad;
