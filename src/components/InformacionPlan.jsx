import React from "react";

function InformacionPlan() {
  // Obtener el usuario del localStorage y parsearlo
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.plan_seleccionado) {
    return (
      <div className="card-info mx-3 mb-4">
        <h3 className="text-white fw-bold text-center mb-3">
          PLAN DE SUSCRIPCIÓN
        </h3>
        <p className="text-white">No hay información de plan disponible.</p>
      </div>
    );
  }

  // Puedes ajustar estos datos según cómo estén guardados o si quieres más detalles
  const planNombre = user.plan_seleccionado; // ej: "Premium"
  const modalidad = user.modalidad_plan; // ej: "mensual" o "anual"
  const fechaFin = user.fecha_fin_plan; // ej: "2025-05-01"

  // Formatear fechas para mostrar, ejemplo sencillo:
  const opcionesFecha = { year: "numeric", month: "long", day: "numeric" };
  const fechaRenovacion = fechaFin
    ? new Date(fechaFin).toLocaleDateString("es-ES", opcionesFecha)
    : "No definida";

  // Puedes poner aquí datos fijos o incluso agregar precio, calidad y dispositivos según planNombre/modalidad
  // Ejemplo simple con datos hardcoded, pero podrías hacer un objeto con esos datos según el plan

  const precios = {
    Premium: "$5/mes",
    Free: "$0",
    VIP: "$10/mes",
  };

  const calidades = {
    Premium: "HD (1080p)",
    Free: "SD (480p)",
    VIP: "Full HD (1080p+)",
  };

  const dispositivos = {
    Premium: "2 pantallas",
    Free: "1 pantalla",
    VIP: "4 pantallas",
  };

  return (
    <div className="card-info mx-3 mb-4">
      <h3 className="text-white fw-bold text-center mb-3">
        PLAN DE SUSCRIPCIÓN
      </h3>

      <div
        className="mb-3 p-3"
        style={{ backgroundColor: "#7f1d1d", color: "#fff" }}>
        <h4 style={{ color: "#f1aeb5" }}>PLAN {planNombre.toUpperCase()}</h4>
        <p className="m-0 text-white">Renovación: {fechaRenovacion}</p>
      </div>

      <h4 style={{ color: "#71717A" }}>Plan actual:</h4>
      <p className="text-white">{planNombre}</p>

      <h4 style={{ color: "#71717A" }}>Modalidad:</h4>
      <p className="text-white">{modalidad}</p>

      <h4 style={{ color: "#71717A" }}>Precio:</h4>
      <p className="text-white">{precios[planNombre] || "No definido"}</p>

      <h4 style={{ color: "#71717A" }}>Calidad:</h4>
      <p className="text-white">{calidades[planNombre] || "No definido"}</p>

      <h4 style={{ color: "#71717A" }}>Dispositivos:</h4>
      <p className="text-white">{dispositivos[planNombre] || "No definido"}</p>

      <div className="mx-auto" style={{ width: "fit-content" }}>
        <a href="/Pagos" className="btn btn-dark border-white">
          CAMBIAR PLAN
        </a>
      </div>
    </div>
  );
}

export default InformacionPlan;
