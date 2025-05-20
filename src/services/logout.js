// services/logout.js
export function logoutUser() {
  localStorage.removeItem("user"); // Asegúrate de eliminar el ítem correcto
  localStorage.removeItem("token"); // Si usas tokens, elimina también esto
  sessionStorage.clear(); // Opcional: si usaste sessionStorage
}
