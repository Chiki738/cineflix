import "../assets/styles/Planes.css";
import usePlanes from "../hooks/usePlanes";

function Planes() {
  const { opcion, setOpcion, planes, elegirPlan } = usePlanes();

  return (
    <div className="pagosContainer d-flex justify-content-center align-items-center text-center text-white p-sm-5 px-1 py-5">
      <div className="p-4" style={{ width: "90%" }}>
        <h2 className="fst-italic fw-bold">CINEFLIX PRICE</h2>

        <div className="d-flex align-items-center justify-content-center gap-3 flex-sm-row flex-column">
          <p className="mb-0 fs-5">Por favor, seleccione un plan</p>
          <div
            className="btn-group py-sm-2 px-sm-3 py-1 px-2 rounded-pill"
            style={{ backgroundColor: "#023047" }}
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
                className="plan p-4 rounded-4 d-flex flex-column gap-2 justify-content-between bg-white"
                style={{ minWidth: "330px" }}>
                <h4 className="text-black text-start">{plan.nombre}</h4>
                <h2 className="text-black">${precio}</h2>
                <ul className="text-start text-black ps-0">
                  {plan.caracteristicas.map((item, index) => (
                    <li key={index}>&nbsp;{item}</li>
                  ))}
                </ul>
                <button
                  className="btnSeleccionar btn px-sm-4 py-sm-1 px-2 fw-bold text-white rounded-3 border-success"
                  onClick={() => elegirPlan(plan)}>
                  Elegir plan
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Planes;
