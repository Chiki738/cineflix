import { useState } from "react";
import "../assets/styles/Pagos.css";

function Pagos() {
  const [opcion, setOpcion] = useState("1");

  return (
    <div className="pagosContainer d-flex justify-content-center align-items-center text-center text-white">
      <div className="p-4" style={{ width: "85%" }}>
        <h2 className="fst-italic fw-bold">CINEFLIX PRICE</h2>

        <div className="d-flex align-items-center justify-content-center gap-3">
          <p className="mb-0 fs-5">Por favor, seleccione un plan</p>
          <div
            className="btn-group py-2 px-3 rounded-pill"
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
          {opcion === "1" && (
            <div>
              <p className="fs-6">Contenido del plan mensual</p>
              <div className="row">
                <div class="col-4 mb-3 mb-sm-0">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">FREE</h5>
                      <ul>
                        <li>Video en  HD </li>
                      </ul>
                      <a href="#" class="btn btn-primary">
                        Seleccionar
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-4 mb-3 mb-sm-0">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Special title treatment</h5>
                      <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                      <a href="#" class="btn btn-primary">
                        Go somewhere
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-4 mb-3 mb-sm-0">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Special title treatment</h5>
                      <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                      <a href="#" class="btn btn-primary">
                        Go somewhere
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {opcion === "2" && (
            <div>
              <p className="fs-6">Contenido del plan anual</p>

              <div className="row">
                <div class="col-4 mb-3 mb-sm-0">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Special title treatment</h5>
                      <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                      <a href="#" class="btn btn-primary">
                        Go somewhere
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-4 mb-3 mb-sm-0">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Special title treatment</h5>
                      <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                      <a href="#" class="btn btn-primary">
                        Go somewhere
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-4 mb-3 mb-sm-0">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Special title treatment</h5>
                      <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                      <a href="#" class="btn btn-primary">
                        Go somewhere
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pagos;
