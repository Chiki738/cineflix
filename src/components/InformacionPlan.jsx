import ModificarInformacion from "./modals/ModificarInformacion";

function InformacionPlan() {
  return (
    <div className="card-info mx-3 mb-4">
      <h3 className="text-white fw-bold text-center mb-3">
        PLAN DE SUSCRIPCIÓN
      </h3>

      <div
        className="mb-3 p-3"
        style={{ backgroundColor: "#7f1d1d", color: "#fff" }}>
        <h4 style={{ color: "#f1aeb5" }}>PLAN PREMIUM</h4>
        <p className="m-0 text-white">Renovación: 25 de abril</p>
      </div>

      <h4 style={{ color: "#71717A" }}>Plan actual:</h4>
      <p className="text-white">Premium</p>
      <h4 style={{ color: "#71717A" }}>Precio:</h4>
      <p className="text-white">$5/mes</p>
      <h4 style={{ color: "#71717A" }}>Calidad:</h4>
      <p className="text-white">HD &#40;1080p&#41;</p>
      <h4 style={{ color: "#71717A" }}>Dispositivos:</h4>
      <p className="text-white">2 pantallas</p>

      <div className="mx-auto" style={{ width: "fit-content" }}>
        <a href="/Pagos" className="btn btn-dark border-white">
          CAMBIAR PLAN
        </a>
      </div>
    </div>
  );
}

export default InformacionPlan;
