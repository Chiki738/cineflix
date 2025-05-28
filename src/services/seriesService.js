const API_URL = "https://cinexflix-gq2n.onrender.com/api/series";

export async function obtenerSeries() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al cargar las series");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerSeries:", error);
    throw error;
  }
}

export async function crearSerie(datosSerie) {
  try {
    const response = await fetch(`${API_URL}/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosSerie),
    });

    if (!response.ok) {
      throw new Error("Error al crear la serie");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en crearSerie:", error);
    throw error;
  }
}

export async function agregarTemporada(idSerie, temporada) {
  try {
    const response = await fetch(`${API_URL}/${idSerie}/temporadas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temporada),
    });

    if (!response.ok) {
      throw new Error("Error al agregar la temporada");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en agregarTemporada:", error);
    throw error;
  }
}

export async function eliminarSerie(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la serie");
  }
}

export async function editarSerie(id, datosActualizados) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    });

    if (!response.ok) {
      throw new Error("Error al editar la serie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en editarSerie:", error);
    throw error;
  }
}
export async function obtenerSeriePorId(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener la serie");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerSeriePorId:", error);
    throw error;
  }
}
