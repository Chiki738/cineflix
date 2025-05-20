// src/service/youtubeService.js
const API_KEY_YOUTUBE = "TU_API_KEY"; // Usa tu clave de YouTube

export const buscarTrailerYoutube = async (titulo) => {
  const query = encodeURIComponent(`${titulo} trailer`);
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY_YOUTUBE}&type=video&maxResults=1`
  );
  const data = await res.json();
  return data.items?.[0]?.id?.videoId || null;
};
