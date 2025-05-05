import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/styles/Pagos.css";

function Pagos() {
  const [opcion, setOpcion] = useState("1");

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

        <div className="mt-3">
          {["1", "2"].includes(opcion) && (
            <>
              <p className="fs-6">
                Contenido del plan {opcion === "1" ? "mensual" : "anual"}
              </p>
              <div className="row">
                {[
                  {
                    nombre: "Básico",
                    precio: opcion === "1" ? "FREE" : "FREE",
                    beneficios: [
                      "Video en HD (1080p)",
                      "1 pantalla simultanea",
                      "Sin descargas offline",
                      "Acceso al catálogo estándar",
                      "Reproducción con anuncios",
                    ],
                  },
                  {
                    nombre: "Premium",
                    precio: opcion === "1" ? "$5/mes" : "$50/anual",
                    beneficios: [
                      "Video en HD (1080p)",
                      "2 pantallas simultaneas",
                      "Descargas offline (Hasta 5)",
                      "Acceso al catálogo completo",
                      "Reproducción sin anuncios",
                    ],
                  },
                  {
                    nombre: "Vip",
                    precio: opcion === "1" ? "$10/mes" : "$100/anual",
                    beneficios: [
                      "Video en HD (1080p) y HDR",
                      "4 pantallas simultaneas",
                      "Descargas ilimitadas",
                      "Estrenos exclusivos",
                      "Perfiles personalizados",
                      "Soporte al cliente personalizado",
                    ],
                  },
                ].map((plan, i) => (
                  <div
                    key={i}
                    className="col-12 col-md-6 col-xl-4 d-flex align-items-stretch mb-5 mb-md-5 mb-xl-0 flex-wrap">
                    <div className="card w-100 h-100">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                          <strong>{plan.nombre}</strong>
                        </h5>
                        <h6 className="mb-4">{plan.precio}</h6>
                        <ul className="text-start flex-grow-1 ps-md-0 ps-sm-5 ps-2">
                          {plan.beneficios.map((b, j) => (
                            <li key={j} className="mb-2">
                              &#32;{b}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto d-flex justify-content-center">
                          <Link to="/" className="btn btn-primary">
                            Seleccionar
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pagos;
