import { useState } from "react";
import { crearPelicula } from "../services/peliculasService";
import {
  buscarPeliculasPorNombre,
  buscarDetallesPorTitulo,
} from "../services/omdbService";

export function useAgregarPelicula(onPeliculaAgregada) {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [pelicula, setPelicula] = useState({});
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [generoSeleccionado, setGeneroSeleccionado] = useState("");
  const [imagenPreview, setImagenPreview] = useState(null);

  const [actores, setActores] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [rating, setRating] = useState(0);

  const buscarSugerencias = async (query) => {
    if (query.length < 2) return setSugerencias([]);
    const resultados = await buscarPeliculasPorNombre(query);
    setSugerencias(resultados.slice(0, 5));
  };

  const seleccionarPelicula = async (tituloSeleccionado) => {
    setTitulo(tituloSeleccionado);
    const datos = await buscarDetallesPorTitulo(tituloSeleccionado);

    const actoresArray = datos.Actors
      ? datos.Actors.split(",").map((a) => a.trim())
      : [];
    const directoresArray = datos.Director
      ? datos.Director.split(",").map((d) => d.trim())
      : [];

    const peliculaFormateada = {
      titulo: datos.Title,
      descripcion: datos.Plot,
      duracion: parseInt(datos.Runtime) || 0,
      anio: datos.Year || "",
      actores: actoresArray,
      directores: directoresArray,
      rating: parseFloat(datos.imdbRating) || 0,
      portada: datos.Poster,
    };

    setPelicula(peliculaFormateada);
    setImagenPreview(peliculaFormateada.portada);
    setActores(peliculaFormateada.actores);
    setDirectores(peliculaFormateada.directores);
    setRating(peliculaFormateada.rating);
    setSugerencias([]);
  };

  const limpiarFormulario = () => {
    setId("");
    setTitulo("");
    setPelicula({});
    setGeneroSeleccionado("");
    setImagenPreview(null);
    setActores([]);
    setDirectores([]);
    setRating(0);
    setSugerencias([]);
  };

  const handleGuardar = async () => {
    try {
      const nuevaPelicula = {
        id,
        titulo,
        portada: imagenPreview,
        descripcion: pelicula.descripcion,
        duracion: pelicula.duracion,
        anio: pelicula.anio,
        categoria: generoSeleccionado,
        actores,
        directores,
        rating,
      };

      await crearPelicula(nuevaPelicula);

      // Cerrar modal inmediatamente
      const botonCerrar = document.querySelector(
        "#modalAgregarPelicula .btn-close"
      );
      if (botonCerrar) botonCerrar.click();

      limpiarFormulario();

      // Mostrar alerta temporal
      setTimeout(() => {
        setMostrarAlerta(true);
        setTimeout(() => setMostrarAlerta(false), 3000);
      }, 1000);

      if (onPeliculaAgregada) {
        onPeliculaAgregada();
      }
    } catch (error) {
      console.error("Error al guardar la película:", error);
    }
  };

  return {
    id,
    setId,
    titulo,
    setTitulo,
    sugerencias,
    buscarSugerencias,
    seleccionarPelicula,
    pelicula,
    mostrarAlerta,
    generoSeleccionado,
    setGeneroSeleccionado,
    imagenPreview,
    actores,
    setActores,
    directores,
    setDirectores,
    rating,
    setRating,
    handleGuardar,
  };
}
