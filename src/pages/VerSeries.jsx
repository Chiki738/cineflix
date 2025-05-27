import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { obtenerSeriePorId } from "../services/seriesService";

function TemporadasAcordeon({ temporadas, onSelectEpisodio }) {
  return (
    <div className="accordion" id="accordionTemporadas">
      {temporadas.map((temp, indexTemp) => (
        <div className="accordion-item" key={temp.numero}>
          <h2 className="accordion-header" id={`heading${temp.numero}`}>
            <button
              className={`accordion-button ${
                indexTemp !== 0 ? "collapsed" : ""
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${temp.numero}`}
              aria-expanded={indexTemp === 0 ? "true" : "false"}
              aria-controls={`collapse${temp.numero}`}>
              Temporada {temp.numero}
            </button>
          </h2>
          <div
            id={`collapse${temp.numero}`}
            className={`accordion-collapse collapse ${
              indexTemp === 0 ? "show" : ""
            }`}
            aria-labelledby={`heading${temp.numero}`}
            data-bs-parent="#accordionTemporadas">
            <div className="accordion-body">
              <ul className="list-group">
                {temp.episodios.map((ep) => (
                  <li
                    key={ep.numero}
                    className="list-group-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelectEpisodio(temp.numero, ep.numero)}>
                    <strong>Episodio {ep.numero}:</strong> {ep.titulo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function VerSerie() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [error, setError] = useState(null);

  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [videoActual, setVideoActual] = useState("");

  const [temporadaSeleccionada, setTemporadaSeleccionada] = useState(null);
  const [episodioSeleccionado, setEpisodioSeleccionado] = useState(null);

  // Referencia al iframe para hacer scroll hacia él
  const iframeRef = useRef(null);

  useEffect(() => {
    async function fetchSerie() {
      try {
        const data = await obtenerSeriePorId(id);
        setSerie(data);
      } catch (err) {
        console.error(err);
        setError("Serie no encontrada");
      }
    }

    async function fetchYoutubeVideos() {
      try {
        const res = await fetch(
          "http://localhost:8080/api/youtube/playlist/videos?playlistId=PLM99PdrQScMxn0fMm_1OswE4Xv4fJrbLi"
        );
        const data = await res.json();
        setYoutubeVideos(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchSerie();
    fetchYoutubeVideos();
  }, [id]);

  useEffect(() => {
    if (!serie || youtubeVideos.length === 0) return;

    if (temporadaSeleccionada && episodioSeleccionado) {
      const temporada = serie.temporadas.find(
        (t) => t.numero === temporadaSeleccionada
      );
      if (!temporada) return;

      const episodioIndex = temporada.episodios.findIndex(
        (ep) => ep.numero === episodioSeleccionado
      );
      if (episodioIndex === -1) return;

      const videoIndex = episodioIndex % youtubeVideos.length;
      setVideoActual(youtubeVideos[videoIndex].url);
    }
  }, [temporadaSeleccionada, episodioSeleccionado, serie, youtubeVideos]);

  // Cuando cambie episodio, hacer scroll suave hacia el iframe
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [videoActual]);

  useEffect(() => {
    if (serie && serie.temporadas?.length > 0) {
      const primeraTemp = serie.temporadas[0];
      if (primeraTemp.episodios?.length > 0) {
        setTemporadaSeleccionada(primeraTemp.numero);
        setEpisodioSeleccionado(primeraTemp.episodios[0].numero);
      }
    }
  }, [serie]);

  function handleSelectEpisodio(tempNum, epNum) {
    setTemporadaSeleccionada(tempNum);
    setEpisodioSeleccionado(epNum);
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-black p-4 text-white text-center">
        {error}
      </div>
    );
  }

  if (!serie) {
    return (
      <div className="min-vh-100 bg-black p-4 text-white text-center">
        Cargando serie...
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-black p-4">
      <div className="d-flex mb-5">
        <div className="me-5 mb-3" style={{ minWidth: "250px" }}>
          <img
            src={serie.imagen}
            className="img-thumbnail"
            alt={serie.titulo}
            style={{ width: "250px", height: "auto" }}
          />
        </div>

        <div className="flex-grow-1">
          <h3 className="text-white display-4">{serie.titulo}</h3>
          <p className="text-white fs-4">⭐ {serie.rating}/10</p>
          <p className="fs-4 text-white">{serie.descripcion}</p>
          <p className="text-white mb-1">
            <strong>Categoría:</strong> {serie.categoria}
          </p>
          <p className="text-white mb-1">
            <strong>Año Inicio:</strong> {serie.anioInicio}
          </p>
          <p className="text-white mb-1">
            <strong>Año Fin:</strong> {serie.anioFin}
          </p>
        </div>
      </div>

      <div className="ratio ratio-16x9 mb-4" ref={iframeRef}>
        {videoActual ? (
          <iframe
            src={videoActual}
            title="YouTube video"
            allowFullScreen
            frameBorder="0"
            width="100%"
            height="100%"
          />
        ) : (
          <p className="text-white">Cargando video...</p>
        )}
      </div>

      {serie.temporadas && serie.temporadas.length > 0 && (
        <div className="text-white">
          <h4>Temporadas</h4>
          <TemporadasAcordeon
            temporadas={serie.temporadas}
            onSelectEpisodio={handleSelectEpisodio}
          />
        </div>
      )}
    </div>
  );
}

export default VerSerie;
