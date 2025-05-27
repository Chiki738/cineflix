import { useUsuarios } from "../hooks/useUsuarios";

export default function UsuariosAdmin() {
  const { usuarios, loading, error } = useUsuarios();

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Email</th>
          <th>Plan Seleccionado</th>
          <th>Modalidad Plan</th>
          <th>Inicio Plan</th>
          <th>Fin Plan</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.length > 0 ? (
          usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre || "N/A"}</td>
              <td>{user.apellidos || "N/A"}</td>
              <td>{user.email}</td>
              <td>{user.plan_seleccionado || "N/A"}</td>
              <td>{user.modalidad_plan || "N/A"}</td>
              <td>
                {user.fecha_inicio_plan
                  ? new Date(user.fecha_inicio_plan).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {user.fecha_fin_plan
                  ? new Date(user.fecha_fin_plan).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              No se encontraron usuarios.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
