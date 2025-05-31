import { useEffect, useState } from "react";
import api from "../api";

function Pizarra() {
  const [pizarras, setPizarras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/pizarras/")
      .then(res => {
        setPizarras(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando pizarras...</div>;

  return (
    <div>
      <h2>Pizarras</h2>
      <ul>
        {pizarras.map(p => (
          <li key={p.id}>
            <strong>{p.usuario}</strong>: {p.contenido} <br />
            <small>
              {new Date(p.fecha_ingreso).toLocaleString('es-EC', {
                dateStyle: 'short',
                timeStyle: 'short'
              })}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pizarra;