import { apiRequest } from "./apiClient";

export const obtenerPlanes = async () => {
  return apiRequest("/planes");
};
