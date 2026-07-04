import { useState, useEffect } from "react";
import ModificarInformacion from "../modals/ModificarInformacion";
import { getStoredUser, setStoredUser } from "../../utils/storage";

function InformacionPersonal() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
  });

  useEffect(() => {
    const storedUser = getStoredUser();
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
      <h3 className="text-white fw-bold text-center">Información personal</h3>

      <div>
        <h4 className="text-muted-soft fs-6">Nombre</h4>
        <p className="text-white">{user.nombre || "No disponible"}</p>
      </div>
      <div>
        <h4 className="text-muted-soft fs-6">Apellido</h4>
        <p className="text-white">{user.apellidos || "No disponible"}</p>
      </div>
      <div>
        <h4 className="text-muted-soft fs-6">Correo electrónico</h4>
        <p className="text-white">{user.email || "No disponible"}</p>
      </div>
      <div>
        <h4 className="text-muted-soft fs-6">Teléfono</h4>
        <p className="text-white">{user.telefono || "No disponible"}</p>
      </div>

      <div className="mx-auto" style={{ width: "fit-content" }}>
        <button
          className="btn btn-ghost"
          onClick={() => setMostrarModal(true)}>
          Editar información
        </button>
      </div>

      {mostrarModal && (
        <ModificarInformacion
          userData={user}
          onClose={() => setMostrarModal(false)}
          onSave={(updatedUser) => {
            setUser(updatedUser);
            setStoredUser(updatedUser);
          }}
        />
      )}
    </div>
  );
}

export default InformacionPersonal;
