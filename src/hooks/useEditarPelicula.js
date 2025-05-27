import { useEffect, useState } from "react";
import { actualizarPelicula as actualizarPeliculaServicio } from "../services/peliculasService";
7
export function useEditarPelicula(pelicula, onActualizar) {
  const [formData, setFormData] = useState({
    id: "",
    titulo: "",
    portada: "",
    descripcion: "",
    duracion: "",
    anio: "",
    actores: "",
    directores: "",
    rating: "",
    categoria: "",
  });

  const [camposModificados, setCamposModificados] = useState(new Set());
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  useEffect(() => {
    if (pelicula) {
      setFormData({
        id: pelicula.id || "",
        titulo: pelicula.titulo || "",
        portada: pelicula.portada || "",
        descripcion: pelicula.descripcion || "",
        duracion: pelicula.duracion ? String(pelicula.duracion) : "",
        anio: pelicula.anio || "",
        actores: (pelicula.actores || []).join(", "),
        directores: (pelicula.directores || []).join(", "),
        rating: pelicula.rating ? String(pelicula.rating) : "",
        categoria: pelicula.categoria || "",
      });
      setCamposModificados(new Set());
    }
  }, [pelicula]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setCamposModificados((prev) => new Set(prev).add(name));
  };

  const actualizarPelicula = async () => {
    try {
      const peliculaActualizada = {
        ...formData,
        duracion: parseInt(formData.duracion),
        rating: parseFloat(formData.rating),
        actores: formData.actores.split(",").map((a) => a.trim()),
        directores: formData.directores.split(",").map((d) => d.trim()),
      };

      await actualizarPeliculaServicio(peliculaActualizada);

      if (typeof onActualizar === "function") {
        onActualizar(peliculaActualizada);
      }

      setMostrarAlerta(true);
      setCamposModificados(new Set());
    } catch (error) {
      alert("Error al actualizar la película: " + error.message);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    camposModificados,
    setCamposModificados,
    mostrarAlerta,
    setMostrarAlerta,
    actualizarPelicula,
  };
}
