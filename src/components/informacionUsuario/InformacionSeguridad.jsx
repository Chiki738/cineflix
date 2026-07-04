import { Eye, EyeOff, LockKeyhole, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import CambiarContrasenia from "../modals/CambiarContrasenia";
import { getStoredUser } from "../../utils/storage";

function InformacionSeguridad() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("********");
  const [fechaActualizacion, setFechaActualizacion] = useState(null);

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      if (user.fecha_actualizacion_contrasena) {
        setFechaActualizacion(new Date(user.fecha_actualizacion_contrasena));
      }
    }
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  // Función para actualizar la contraseña en el estado cuando cambia en CambiarContrasenia
  const actualizarPassword = (nuevaPass) => {
    setPassword("*".repeat(Math.min(nuevaPass.length, 12)));
    setFechaActualizacion(new Date());
  };

  const formatoFecha = (fecha) => {
    if (!fecha) return "No disponible";
    return fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="card-info mx-3 mb-4">
      <h3 className="fw-bold text-center mb-4">Seguridad</h3>

      <div>
        <h4 className="text-muted-soft fs-6">Contraseña</h4>
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
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="small text-muted-soft mt-2 mb-0">
          La contraseña no se guarda en este dispositivo.
        </p>
      </div>

      <div className="mt-4">
        <h4 className="text-muted-soft fs-6">Última actualización</h4>
        <p className="text-white">{formatoFecha(fechaActualizacion)}</p>
      </div>

      <div className="d-flex flex-column align-items-center gap-3 mt-4">
        <button
          className="btn btn-ghost w-75 d-inline-flex align-items-center justify-content-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#modalCambiarContrasenia">
          <LockKeyhole size={18} />
          Cambiar contraseña
        </button>

        <button
          className="btn btn-danger w-75 d-inline-flex align-items-center justify-content-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#modalEliminar">
          <Trash2 size={18} />
          Eliminar cuenta
        </button>
      </div>

      <CambiarContrasenia actualizarPassword={actualizarPassword} />
    </div>
  );
}

export default InformacionSeguridad;
