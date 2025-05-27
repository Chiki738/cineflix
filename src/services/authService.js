// services/authService.js
import { loginAdmin } from "./adminService";
import { loginUsuario } from "./usuarioService";

export async function loginUser(credentials) {
  const admin = await loginAdmin(credentials);
  if (admin) return admin;

  const user = await loginUsuario(credentials);
  if (user) return user;

  throw new Error("Credenciales incorrectas");
}
