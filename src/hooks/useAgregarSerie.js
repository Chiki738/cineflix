import { useState } from "react";
import {
  buscarSeriesPorNombre,
  buscarDetallesSerie,
} from "../services/omdbService";
import { crearSerie } from "../services/seriesService";

export function useAgregarSerie(onSerieAgregada) {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [serie, setSerie] = useState({});
  const [imagenPreview, setImagenPreview] = useState(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [generoManual, setGeneroManual] = useState("");
  const [yearInicio, setYearInicio] = useState("");
  const [yearFin, setYearFin] = useState("");

  const buscarSugerencias = async (query) => {
    if (query.length < 2) return setSugerencias([]);
    const resultados = await buscarSeriesPorNombre(query);
    setSugerencias(resultados.slice(0, 5));
  };

  const seleccionarSerie = async (tituloSeleccionado) => {
    setTitulo(tituloSeleccionado);
    const datosSerie = await buscarDetallesSerie(tituloSeleccionado);

    if (datosSerie.Response === "True") {
      setSerie(datosSerie);
      setImagenPreview(datosSerie.Poster);

      const years = datosSerie.Year ? datosSerie.Year.split("–") : [];
      setYearInicio(years[0] || "");
      setYearFin(years[1] || "");

      setGeneroManual("");
    } else {
      setSerie({});
      setImagenPreview(null);
      setGeneroManual("");
      setYearInicio("");
      setYearFin("");
    }

    setSugerencias([]);
  };

  const limpiarFormulario = () => {
    setId("");
    setTitulo("");
    setSerie({});
    setImagenPreview(null);
    setSugerencias([]);
    setGeneroManual("");
    setYearInicio("");
    setYearFin("");
  };

  const handleGuardar = async () => {
    // Cerrar modal inmediatamente
    const botonCerrar = document.querySelector(
      "#modalAgregarSerie .btn-close"
    );
    if (botonCerrar) botonCerrar.click();

    if (!id || !titulo || !serie.Plot || !yearInicio) {
      alert("Faltan campos requeridos.");
      return;
    }

    const nuevaSerie = {
      id,
      titulo,
      descripcion: serie.Plot,
      rating: serie.imdbRating || "",
      categoria: generoManual || serie.Genre?.split(",")[0] || "Desconocido",
      anioInicio: parseInt(yearInicio),
      anioFin: parseInt(yearFin),
      imagen: serie.Poster,
    };

    try {
      await crearSerie(nuevaSerie);
      setMostrarAlerta(true);
      setTimeout(() => setMostrarAlerta(false), 3000);
      limpiarFormulario();
      if (onSerieAgregada) onSerieAgregada();
    } catch (error) {
      alert("Error al guardar la serie: " + error.message);
    }
  };

  return {
    id,
    setId,
    titulo,
    setTitulo,
    sugerencias,
    buscarSugerencias,
    seleccionarSerie,
    serie,
    imagenPreview,
    mostrarAlerta,
    handleGuardar,
    generoManual,
    setGeneroManual,
    yearInicio,
    setYearInicio,
    yearFin,
    setYearFin,
  };
}
