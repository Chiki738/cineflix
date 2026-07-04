import { DASHBOARD_URL } from "../services/apiClient";

function Analisis() {
  return (
    <iframe
      src={DASHBOARD_URL}
      className="border-0"
      style={{ width: "100%", height: "100vh" }}
      title="Panel de análisis"
    />
  );
}

export default Analisis;
