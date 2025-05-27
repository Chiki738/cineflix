import { useState, useEffect } from "react";
import ModificarInformacion from "../modals/ModificarInformacion";

function InformacionPersonal() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        nombre: storedUser.nombre || "",
        apellidos: storedUser.apellidos || "",
        email: storedUser.email || "",
        telefono: storedUser.telefono || "",
      });
    }
  }, []);

  return (
    <div className="card-info mx-3 mb-4">
      <h3 className="text-white fw-bold text-center">INFORMACIÓN PERSONAL</h3>

      <div>
        <h4 style={{ color: "#71717A" }}>Nombre:</h4>
        <p className="text-white">{user.nombre || "No disponible"}</p>
      </div>
      <div>
        <h4 style={{ color: "#71717A" }}>Apellido:</h4>
        <p className="text-white">{user.apellidos || "No disponible"}</p>
      </div>
      <div>
        <h4 style={{ color: "#71717A" }}>Correo electrónico:</h4>
        <p className="text-white">{user.email || "No disponible"}</p>
      </div>
      <div>
        <h4 style={{ color: "#71717A" }}>Teléfono:</h4>
        <p className="text-white">{user.telefono || "No disponible"}</p>
      </div>

      <div className="mx-auto" style={{ width: "fit-content" }}>
        <button
          className="btn btn-dark border-white"
          onClick={() => setMostrarModal(true)}>
          EDITAR INFORMACIÓN
        </button>
      </div>

      {mostrarModal && (
        <ModificarInformacion
          userData={user}
          onClose={() => setMostrarModal(false)}
          onSave={(updatedUser) => {
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }}
        />
      )}
    </div>
  );
}

export default InformacionPersonal;
