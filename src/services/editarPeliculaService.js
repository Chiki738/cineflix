export async function actualizarPelicula(formData) {
  const dataActualizar = {
    ...formData,
    duracion: Number(formData.duracion),
    rating: Number(formData.rating),
    actores: formData.actores.split(",").map((a) => a.trim()),
    directores: formData.directores.split(",").map((d) => d.trim()),
  };

  const response = await fetch(
    `http://localhost:8080/api/peliculas/${formData.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataActualizar),
    }
  );

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || response.statusText);

  return data;
}
