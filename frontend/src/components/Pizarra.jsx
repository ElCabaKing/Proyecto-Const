import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import '../styles/General.css';

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

  if (loading) return <div className="pizarra-loading">Cargando pizarras...</div>;

  return (
    <div className="pizarra-container">
      <h2 className="pizarra-title">Pizarras</h2>
      <ul className="pizarra-list">
        {pizarras.map(p => (
          <li key={p.id} className="pizarra-item">
            <strong>
              <Link
                to={`/user/${p.usuario}`}
                className="pizarra-username"
              >
                {p.usuario}
              </Link>
            </strong>
            : {p.contenido}
            <br />
            <small className="pizarra-date">
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