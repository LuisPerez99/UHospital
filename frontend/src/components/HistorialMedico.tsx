import { useAuth } from "../contexts/AuthContext";

interface HistorialMedicoProps {}

export function HistorialMedico() {
  const { user } = useAuth();

  const printUser = () => {
    console.log(user);
  };

  return (
    <>
      <div className="mb-4 p-4 bg-gray-100 rounded shadow-md">
        <h2 className="text-2xl font-bold">Mis Historial Médico</h2>
      </div>
      <div className="mb-4 p-4 flex bg-white rounded shadow-md gap-4">
        <h2 onClick={printUser} >Filtros</h2>
      </div>
      <div className="p-4 flex flex-col gap-4 rounded shadow-md">
        {user?.historial_medico?.length === 0 ? (
          <p>No hay registros en el historial médico.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Fecha
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Descripcion
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Tipo
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Notas
                </th>
              </tr>
            </thead>
            <tbody>
              {user?.historial_medico?.map((registro, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border border-gray-300">
                    {registro.fecha}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {registro.descripcion}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {registro.tipo}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {registro.notas || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
