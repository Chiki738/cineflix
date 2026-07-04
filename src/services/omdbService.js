const API_KEY = import.meta.env.VITE_OMDB_API_KEY ?? "abc8d0ee";
const OMDB_URL = "https://www.omdbapi.com/";

function buildOmdbUrl(params) {
  const query = new URLSearchParams({ ...params, apikey: API_KEY });
  return `${OMDB_URL}?${query.toString()}`;
}

export const buscarPeliculasPorNombre = async (titulo) => {
  const res = await fetch(buildOmdbUrl({ s: titulo }));
  const data = await res.json();
  return data.Search || [];
};

export const buscarDetallesPorTitulo = async (titulo) => {
  const res = await fetch(buildOmdbUrl({ t: titulo }));
  return await res.json();
};

export const buscarSeriesPorNombre = async (titulo) => {
  const res = await fetch(buildOmdbUrl({ s: titulo, type: "series" }));
  const data = await res.json();
  return data.Search || [];
};

export const buscarDetallesSerie = async (titulo) => {
  const res = await fetch(buildOmdbUrl({ t: titulo, type: "series" }));
  return await res.json();
};

export const buscarTemporadaSerie = async (imdbID, numeroTemporada) => {
  const res = await fetch(buildOmdbUrl({ i: imdbID, Season: numeroTemporada }));
  return await res.json();
};
