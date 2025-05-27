// services/logout.js
export function logoutUser() {
  localStorage.removeItem("user"); 
  localStorage.removeItem("token");
  sessionStorage.clear();
}
