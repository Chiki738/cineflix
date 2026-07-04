import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerPlanes } from "../services/planService";
import { registerUser } from "../services/usuarioService";
import {
  clearPendingRegistration,
  getPendingRegistration,
  getStoredUser,
} from "../utils/storage";

export default function usePlanes() {
  const [opcion, setOpcion] = useState("1");
  const [planes, setPlanes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPlanes = async () => {
      try {
        const datos = await obtenerPlanes();
        setPlanes(datos);
      } catch {
        setPlanes([]);
      }
    };
    cargarPlanes();
  }, []);

  const elegirPlan = async (plan) => {
    try {
      const user = getPendingRegistration() || getStoredUser();
      if (!user) {
        alert("No hay datos de usuario, por favor regístrate primero.");
        navigate("/Registro");
        return;
      }

      const modalidad = opcion === "1" ? "mensual" : "anual";

      const usuarioConPlan = {
        ...user,
        plan_seleccionado: plan.nombre,
        modalidad_plan: modalidad,
        fecha_inicio_plan: new Date().toISOString(),
        fecha_fin_plan: new Date(
          new Date().setMonth(
            new Date().getMonth() + (modalidad === "mensual" ? 1 : 12)
          )
        ).toISOString(),
      };

      await registerUser(usuarioConPlan);

      clearPendingRegistration();
      alert("Plan seleccionado y registro completo.");
      navigate("/Login");
    } catch (error) {
      alert("Error al seleccionar plan: " + error.message);
    }
  };

  return { opcion, setOpcion, planes, elegirPlan };
}
