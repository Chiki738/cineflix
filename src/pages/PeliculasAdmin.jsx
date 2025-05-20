import React, { useState, useEffect } from "react";
import FotoPortada from "../assets/img/transformers.jpg";
import ConfirmarEliminar from "../components/modals/ConfirmarAccion";
import AgregarPelicula from "../components/modals/AgregarPelicula";
import EditarPelicula from "../components/modals/EditarPelicula";

function PeliculasAdmin() {
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  const cargarPeliculas = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/peliculas");
      if (!response.ok) throw new Error("Error al cargar películas");
      const data = await response.json();
      setPeliculas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const peliculasFiltradas = peliculas.filter((p) =>
    p.titulo.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  const extraerNumero = (id) => {
    const match = id.toUpperCase().match(/^MOV(\d+)$/);
    return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
  };

  const peliculasOrdenadas = peliculasFiltradas.sort((a, b) => {
    const numA = extraerNumero(a.id);
    const numB = extraerNumero(b.id);
    return numA - numB;
  });

  const handleChange = (e) => setBusqueda(e.target.value);
  const handleBuscar = (e) => e.preventDefault();

  const eliminarPelicula = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/peliculas/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("No se pudo eliminar la película");

      // Recargar la lista de películas después de eliminar
      cargarPeliculas();
    } catch (error) {
      console.error("Error al eliminar la película:", error);
    }
  };

  return (
    <div className="min-vh-100 px-3 py-5">
      <div className="d-flex justify-content-around align-items-center mb-5">
        <form className="d-flex w-50" role="search" onSubmit={handleBuscar}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
            value={busqueda}
            onChange={handleChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Buscar
          </button>
        </form>

        <button
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#modalAgregarPelicula"
          onClick={cargarPeliculas}>
          Agregar Película
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Portada</th>
            <th>Nombre</th>
            <th>Calificación</th>
            <th>Descripción</th>
            <th>Publicación</th>
            <th>Duración</th>
            <th>Género</th>
            <th>Botones</th>
          </tr>
        </thead>
        <tbody>
          {peliculasOrdenadas.length > 0 ? (
            peliculasOrdenadas.map((pelicula) => (
              <tr key={pelicula.id}>
                <th>{pelicula.id}</th>
                <td>
                  <img
                    src={pelicula.portada || FotoPortada}
                    alt={pelicula.titulo}
                    className="rounded img-fluid"
                    style={{ maxWidth: "100px" }}
                  />
                </td>
                <td>{pelicula.titulo}</td>
                <td>
                  {pelicula.rating ? pelicula.rating.toFixed(1) : "N/A"}/10
                </td>
                <td>{pelicula.descripcion || "Sin descripción"}</td>
                <td>{pelicula.anio || "N/A"}</td>
                <td>
                  {pelicula.duracion ? `${pelicula.duracion} min` : "N/A"}
                </td>
                <td>{pelicula.categoria || "N/A"}</td>
                <td className="d-flex flex-column align-items-center gap-2">
                  <button
                    className="btn btn-success w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEditar"
                    onClick={() => setPeliculaSeleccionada(pelicula)}>
                    EDITAR
                  </button>
                  <button
                    className="btn btn-danger w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEliminar"
                    onClick={() => setPeliculaSeleccionada(pelicula)}>
                    ELIMINAR
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No se encontraron películas.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AgregarPelicula onPeliculaAgregada={cargarPeliculas} />
      <EditarPelicula
        pelicula={peliculaSeleccionada}
        onActualizar={cargarPeliculas}
      />
      <ConfirmarEliminar
        pelicula={peliculaSeleccionada}
        onConfirm={() => eliminarPelicula(peliculaSeleccionada.id)}
      />
    </div>
  );
}

export default PeliculasAdmin;
