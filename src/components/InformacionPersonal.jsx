import { useState } from "react";
import ModificarInformacion from "./modals/ModificarInformacion";

function InformacionPersonal() {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="card-info mx-3 mb-4">
      <h3 className="text-white fw-bold text-center">INFORMACIÓN PERSONAL</h3>
      <div>
        <h4 style={{ color: "#71717A" }}>Nombre:</h4>
        <p className="text-white">GRUPO</p>
      </div>
      <div>
        <h4 style={{ color: "#71717A" }}>Apellido:</h4>
        <p className="text-white">A</p>
      </div>
      <div>
        <h4 style={{ color: "#71717A" }}>Correo electrónico:</h4>
        <p className="text-white">grupoa@gmail.com</p>
      </div>
      <div>
        <h4 style={{ color: "#71717A" }}>Teléfono:</h4>
        <p className="text-white">+51 987 654 321</p>
      </div>

      <div className="mx-auto" style={{ width: "fit-content" }}>
        <button
          className="btn btn-dark border-white"
          onClick={() => setMostrarModal(true)}>
          EDITAR INFORMACIÓN
        </button>
      </div>

      {mostrarModal && (
        <ModificarInformacion onClose={() => setMostrarModal(false)} />
      )}
    </div>
  );
}

export default InformacionPersonal;
