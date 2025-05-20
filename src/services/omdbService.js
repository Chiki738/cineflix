// src/service/omdbService.js
const API_KEY = "abc8d0ee";

export const buscarPeliculasPorNombre = async (titulo) => {
  const res = await fetch(
    `https://www.omdbapi.com/?s=${titulo}&apikey=${API_KEY}`
  );
  const data = await res.json();
  return data.Search || []; // Array de sugerencias
};

export const buscarDetallesPorTitulo = async (titulo) => {
  const res = await fetch(
    `https://www.omdbapi.com/?t=${titulo}&apikey=${API_KEY}`
  );
  return await res.json();
};
