// import { useState, useEffect } from "react";
// import { Modal } from "bootstrap";

// // Hook para manejar el formulario
// function useFormData(serie) {
//   const [formData, setFormData] = useState({
//     titulo: "",
//     descripcion: "",
//     rating: "",
//     anioInicio: "",
//     anioFin: "",
//   });

//   useEffect(() => {
//     if (serie) {
//       setFormData({
//         titulo: serie.titulo || "",
//         descripcion: serie.descripcion || "",
//         rating: serie.rating || "",
//         anioInicio: serie.anioInicio || "",
//         anioFin: serie.anioFin || "",
//       });
//     }
//   }, [serie]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   return { formData, handleChange, setFormData };
// }

// // Hook para controlar el modal y limpiar estado al cerrarlo
// function useModal(serie, setSerieAEditar) {
//   useEffect(() => {
//     if (serie) {
//       const modalElement = document.getElementById("modalEditar");
//       const modalInstance = new Modal(modalElement);
//       modalInstance.show();

//       const handleClose = () => setSerieAEditar(null);
//       modalElement.addEventListener("hidden.bs.modal", handleClose);

//       return () => {
//         modalElement.removeEventListener("hidden.bs.modal", handleClose);
//       };
//     }
//   }, [serie, setSerieAEditar]);
// }

// // Hook para manejar el guardado
// function useEditarSerie(editarSerie, serie, formData, refetch) {
//   const guardarCambios = async () => {
//     try {
//       await editarSerie(serie.id, formData);
//       if (refetch) refetch();
//     } catch (error) {
//       console.error("Error al actualizar la serie", error);
//       alert("Error al actualizar");
//     }
//   };

//   return { guardarCambios };
// }

// // Componente principal
// function EditarSerie({ serie, editarSerie, setSerieAEditar, refetch }) {
//   const { formData, handleChange } = useFormData(serie);
//   useModal(serie, setSerieAEditar);
//   const { guardarCambios } = useEditarSerie(editarSerie, serie, formData, refetch);

//   if (!serie) return null;

//   return (
//     <div
//       className="modal fade"
//       id="modalEditar"
//       tabIndex="-1"
//       aria-labelledby="modalEditarLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="modalEditarLabel">
//               Editar Serie
//             </h5>
//             <button
//               id="cerrarModalBtn"
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>

//           <div className="modal-body">
//             <input
//               type="text"
//               name="titulo"
//               className="form-control mb-2"
//               value={formData.titulo}
//               onChange={handleChange}
//               placeholder="Nombre de la serie"
//             />
//             <textarea
//               name="descripcion"
//               className="form-control mb-2"
//               value={formData.descripcion}
//               onChange={handleChange}
//               placeholder="Descripción de la serie"
//             />
//             <input
//               type="text"
//               name="rating"
//               className="form-control mb-2"
//               value={formData.rating}
//               onChange={handleChange}
//               placeholder="Rating"
//             />
//             <input
//               type="text"
//               name="anioInicio"
//               className="form-control mb-2"
//               value={formData.anioInicio}
//               onChange={handleChange}
//               placeholder="Año de inicio"
//             />
//             <input
//               type="text"
//               name="anioFin"
//               className="form-control mb-2"
//               value={formData.anioFin}
//               onChange={handleChange}
//               placeholder="Año de fin o en emisión"
//             />
//           </div>

//           <div className="modal-footer">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               data-bs-dismiss="modal"
//             >
//               Cerrar
//             </button>
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={guardarCambios}
//             >
//               Guardar cambios
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditarSerie;
