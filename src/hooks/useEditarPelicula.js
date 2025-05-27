// hooks/useEditarPelicula.js
import { useState, useEffect } from "react";
import { actualizarPelicula } from "../services/peliculasService";

export function useEditarPelicula(peliculaSeleccionada) {
  const [form, setForm] = useState({
    id: "",
    titulo: "",
    descripcion: "",
    duracion: "",
    anio: "",
    categoria: "",
    actores: "",
    directores: "",
    rating: "",
    portada: "",
  });

  useEffect(() => {
    if (peliculaSeleccionada) {
      setForm({
        id: peliculaSeleccionada.id || "",
        titulo: peliculaSeleccionada.titulo || "",
        descripcion: peliculaSeleccionada.descripcion || "",
        duracion: peliculaSeleccionada.duracion || "",
        anio: peliculaSeleccionada.anio || "",
        categoria: peliculaSeleccionada.categoria || "",
        actores: peliculaSeleccionada.actores
          ? peliculaSeleccionada.actores.join(", ")
          : "",
        directores: peliculaSeleccionada.directores
          ? peliculaSeleccionada.directores.join(", ")
          : "",
        rating: peliculaSeleccionada.rating || "",
        portada: peliculaSeleccionada.portada || "",
      });
    }
  }, [peliculaSeleccionada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await actualizarPelicula(form);
      alert("Película actualizada correctamente");
      // Aquí podrías cerrar modal o actualizar lista
    } catch (error) {
      alert("Error al actualizar la película");
      console.error(error);
    }
  };

  return { form, handleChange, handleSubmit };
}
