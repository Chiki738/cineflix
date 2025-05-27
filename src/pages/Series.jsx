import { useEffect, useState } from "react";
import SeriesCard from "../components/SeriesCard"; // Asegúrate de que el nombre del archivo sea SeriesCard.jsx
import { obtenerSeries } from "../services/seriesService"; // Ajusta la ruta si es distinta

function Series() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const cargarSeries = async () => {
      try {
        const data = await obtenerSeries();
        setSeries(data);
      } catch (error) {
        console.error("Error al cargar las series:", error);
      }
    };

    cargarSeries();
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-wrap align-items-start p-3 bg-black justify-content-center">
      {series.map((serie) => (
        <SeriesCard
          key={serie.id}
          id={serie.id}
          titulo={serie.titulo}
          portada={serie.imagen} // aquí se adapta a "imagen"
        />
      ))}
    </div>
  );
}

export default Series;
