import Informacion from "../pages/Informacion";
import InformacionPersonal from "../components/informacionUsuario/InformacionPersonal";
import PlanSuscripcion from "../components/informacionUsuario/InformacionPlan";
import InformacionSeguridad from "../components/informacionUsuario/InformacionSeguridad";

function InformacionLayout() {
  return (
    <>
      <Informacion>
        <InformacionPersonal />
        <PlanSuscripcion />
        <InformacionSeguridad />
      </Informacion>
    </>
  );
}

export default InformacionLayout;
