import { useState } from "react";
import api from "../api";
import '../styles/General.css';

function PizarraIn({ onInsert }) {
  const [contenido, setContenido] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/api/pizarra/", { contenido });
      setContenido("");
      if (onInsert) onInsert();
    } catch (err) {
      setError("Error al insertar la pizarra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pizarra-in-form">
      <textarea
        value={contenido}
        onChange={e => setContenido(e.target.value)}
        placeholder="Escribe el contenido..."
        required
        rows={3}
        className="pizarra-in-textarea"
      />
      <button
        type="submit"
        disabled={loading}
        className="pizarra-in-btn"
        onClick={() => setTimeout(() => window.location.reload(), 300)}
      >
        {loading ? "Guardando..." : "Agregar Pizarra"}
      </button>
      {error && <div className="pizarra-in-error">{error}</div>}
    </form>
  );
}

export default PizarraIn;