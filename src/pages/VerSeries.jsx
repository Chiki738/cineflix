import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { obtenerSeriePorId } from "../services/seriesService";
import { obtenerVideosPorPlaylist } from "../services/youtubeService";

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
        const data = await obtenerVideosPorPlaylist(
          "PLM99PdrQScMxn0fMm_1OswE4Xv4fJrbLi"
        );
        setYoutubeVideos(data);
      } catch {
        setYoutubeVideos([]);
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
      <div className="page-shell text-white text-center">
        {error}
      </div>
    );
  }

  if (!serie) {
    return (
      <div className="page-shell text-white text-center">
        Cargando serie...
      </div>
    );
  }

  return (
    <main className="page-shell">
      <div className="container">
      <section className="detail-hero d-flex flex-column flex-lg-row gap-4 mb-5">
        <div className="detail-poster">
          <img
            src={serie.imagen}
            className="img-fluid"
            alt={serie.titulo}
          />
        </div>

        <div className="flex-grow-1">
          <p className="section-kicker mb-2">Serie</p>
          <h1 className="text-white display-4 fw-bold">{serie.titulo}</h1>
          <p className="text-white fs-4">⭐ {serie.rating}/10</p>
          <p className="fs-5 text-muted-soft">{serie.descripcion}</p>
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
      </section>

      <section className="ratio ratio-16x9 mb-4 app-surface overflow-hidden" ref={iframeRef}>
        {videoActual ? (
          <iframe
            src={videoActual}
            title={`Video de ${serie.titulo}`}
            allowFullScreen
            frameBorder="0"
            width="100%"
            height="100%"
          />
        ) : (
          <p className="text-white p-4">Cargando video...</p>
        )}
      </section>

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
    </main>
  );
}

export default VerSerie;
