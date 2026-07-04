import { Link } from "react-router-dom";
import { getStoredUser } from "../../utils/storage";

function InformacionPlan() {
  const user = getStoredUser();

  if (!user || !user.plan_seleccionado) {
    return (
      <div className="card-info mx-3 mb-4">
        <h3 className="text-white fw-bold text-center mb-3">
          Plan de suscripción
        </h3>
        <p className="text-muted-soft">No hay información de plan disponible.</p>
      </div>
    );
  }

  const planNombre = user.plan_seleccionado;
  const modalidad = user.modalidad_plan;
  const fechaFin = user.fecha_fin_plan;

  const opcionesFecha = { year: "numeric", month: "long", day: "numeric" };
  const fechaRenovacion = fechaFin
    ? new Date(fechaFin).toLocaleDateString("es-ES", opcionesFecha)
    : "No definida";

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
        Plan de suscripción
      </h3>

      <div
        className="mb-3 p-3"
        style={{ backgroundColor: "#7f1d1d", color: "#fff" }}>
        <h4 className="text-white">Plan {planNombre}</h4>
        <p className="m-0 text-white">Renovación: {fechaRenovacion}</p>
      </div>

      <h4 className="text-muted-soft fs-6">Plan actual</h4>
      <p className="text-white">{planNombre}</p>

      <h4 className="text-muted-soft fs-6">Modalidad</h4>
      <p className="text-white">{modalidad}</p>

      <h4 className="text-muted-soft fs-6">Precio</h4>
      <p className="text-white">{precios[planNombre] || "No definido"}</p>

      <h4 className="text-muted-soft fs-6">Calidad</h4>
      <p className="text-white">{calidades[planNombre] || "No definido"}</p>

      <h4 className="text-muted-soft fs-6">Dispositivos</h4>
      <p className="text-white">{dispositivos[planNombre] || "No definido"}</p>

      <div className="mx-auto" style={{ width: "fit-content" }}>
        <Link to="/Planes" className="btn btn-ghost">
          Cambiar plan
        </Link>
      </div>
    </div>
  );
}

export default InformacionPlan;
