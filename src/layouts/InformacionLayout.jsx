import Informacion from "../pages/Informacion";
import InformacionPersonal from "../components/InformacionPersonal";
import PlanSuscripcion from "../components/InformacionPlan";
import InformacionSeguridad from "../components/InformacionSeguridad";

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
