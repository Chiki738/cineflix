import usePlanes from "../hooks/usePlanes";
import { Check } from "lucide-react";

function Planes() {
  const { opcion, setOpcion, planes, elegirPlan } = usePlanes();

  return (
    <main className="plans-page d-flex justify-content-center align-items-center text-center text-white p-sm-5 px-3 py-5">
      <div className="plans-panel p-4 p-lg-5" style={{ width: "min(100%, 1120px)" }}>
        <p className="section-kicker mb-2">Suscripción</p>
        <h1 className="section-title mb-3">Elige cómo quieres ver CineFlix</h1>

        <div className="d-flex align-items-center justify-content-center gap-3 flex-sm-row flex-column">
          <p className="mb-0 fs-5 text-muted-soft">Selecciona tu modalidad</p>
          <div
            className="btn-group py-sm-2 px-sm-3 py-1 px-2 rounded-pill"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            role="group"
            aria-label="Toggle button group">
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              autoComplete="off"
              checked={opcion === "1"}
              onChange={() => setOpcion("1")}
            />
            <label className="btn rounded-pill m-1" htmlFor="btnradio1">
              Mensual
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio2"
              autoComplete="off"
              checked={opcion === "2"}
              onChange={() => setOpcion("2")}
            />
            <label className="btn rounded-pill m-1" htmlFor="btnradio2">
              Anual
            </label>
          </div>
        </div>

        <div
          className="d-flex flex-wrap justify-content-center gap-4 mt-5"
          style={{ width: "100%" }}>
          {planes.map((plan) => {
            const modalidad = opcion === "1" ? "mensual" : "anual";
            const precio = plan.modalidades[modalidad]?.precio || 0;

            return (
              <div
                key={plan.id}
                className="plan-card p-4 d-flex flex-column gap-3 justify-content-between">
                <h2 className="h4 text-white text-start mb-0">{plan.nombre}</h2>
                <p className="display-6 fw-bold text-white mb-0">${precio}</p>
                <ul className="text-start text-white ps-0 mb-0">
                  {plan.caracteristicas.map((item, index) => (
                    <li key={index} className="d-flex gap-2 align-items-start mb-2">
                      <Check size={18} className="text-success flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-cine px-sm-4 py-2"
                  onClick={() => elegirPlan(plan)}>
                  Elegir plan
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Planes;
