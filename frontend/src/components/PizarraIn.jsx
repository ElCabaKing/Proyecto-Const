import { useState } from "react";
import api from "../api";

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
      if (onInsert) onInsert(); // Para recargar la lista si lo usas
    } catch (err) {
      setError("Error al insertar la pizarra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={contenido}
        onChange={e => setContenido(e.target.value)}
        placeholder="Escribe el contenido..."
        required
        rows={3}
        style={{ width: "100%" }}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Agregar Pizarra"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}

export default PizarraIn;