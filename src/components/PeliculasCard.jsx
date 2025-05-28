import ContenidoCard from "./ContenidoCard";

function PeliculasCard({ id, titulo, portada }) {
  return (
    <ContenidoCard id={id} titulo={titulo} portada={portada} tipo="pelicula" />
  );
}

export default PeliculasCard;
