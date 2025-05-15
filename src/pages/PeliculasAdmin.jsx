import FotoPortada from "../assets/img/transformers.jpg";
import ConfirmarEliminar from "../components/modals/ConfirmarAccion";
import AgregarPelicula from "../components/modals/AgregarPelicula";
import EditarPelicula from "../components/modals/EditarPelicula";

function PeliculasAdmin() {
  return (
    <div className="min-vh-100 px-3 py-5">
      <div className="d-flex justify-content-around align-items-center mb-5">
        {/* Buscador */}
        <form className="d-flex w-50" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
          />
          <button className="btn btn-outline-success" type="submit">
            Buscar
          </button>
        </form>

        {/* Botón Agregar */}
        <button
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#modalAgregarPelicula">
          Agregar Película
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Portada</th>
            <th scope="col">Nombre</th>
            <th scope="col">Calificación</th>
            <th scope="col">Descripción</th>
            <th scope="col">Publicación</th>
            <th scope="col">Duración</th>
            <th scope="col">Genero</th>
            <th scope="col">Archivo</th>
            <th scope="col">Botones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <th>
              <img
                src={FotoPortada}
                className="rounded img-fluid"
                alt="Transformers"
              />
            </th>
            <td>Tranformers</td>
            <td>7/10</td>
            <td>
              An ancient struggle between two Cybertronian races, the heroic
              Autobots and the evil Decepticons, comes to Earth...
            </td>
            <td>03 Jul 2007</td>
            <td>120 min</td>
            <td>Action, Adventure, Sci-Fi</td>
            <td>Tranformers.pm4</td>
            <td className="d-flex flex-column align-items-center gap-2">
              <button
                className="btn btn-success w-100"
                data-bs-toggle="modal"
                data-bs-target="#modalEditar">
                EDITAR
              </button>
              <button
                className="btn btn-danger w-100"
                data-bs-toggle="modal"
                data-bs-target="#modalEliminar">
                ELIMINAR
              </button>
            </td>
          </tr>

          <tr>
            <th>2</th>
            <th>
              <img
                src={FotoPortada}
                className="rounded img-fluid"
                alt="Transformers"
              />
            </th>
            <td>Sparta</td>
            <td>7/10</td>
            <td>
              An ancient struggle between two Cybertronian races, the heroic
              Autobots and the evil Decepticons, comes to Earth...
            </td>
            <td>03 Jul 2007</td>
            <td>120 min</td>
            <td>Action, Adventure, Sci-Fi</td>
            <td>Tranformers.pm4</td>
            <td className="d-flex flex-column align-items-center gap-2">
              <button
                className="btn btn-success w-100"
                data-bs-toggle="modal"
                data-bs-target="#modalEditar">
                EDITAR
              </button>
              <button
                className="btn btn-danger w-100"
                data-bs-toggle="modal"
                data-bs-target="#modalEliminar">
                ELIMINAR
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <AgregarPelicula />
      <EditarPelicula />
      <ConfirmarEliminar />
    </div>
  );
}

export default PeliculasAdmin;
