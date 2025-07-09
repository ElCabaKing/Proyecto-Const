import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import '../styles/General.css';

function User() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    api.get(`/api/user-info/?username=${username}`)
      .then(res => setUser(res.data))
      .catch(() => setError("No se pudo cargar el usuario"))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return <div className="user-loading">Cargando usuario...</div>;
  }

  if (error) {
    return <div className="user-error">{error}</div>;
  }

  if (!user) {
    return <div className="user-notfound">Usuario no encontrado</div>;
  }

  return (
    <div className="user-bg">
      <div className="user-card">
        <h2 className="user-title">Perfil de {user.username}</h2>
        <div className="user-info">
          <div><span className="user-label">Nombre:</span> {user.first_name}</div>
          <div><span className="user-label">Apellido:</span> {user.last_name}</div>
          <div><span className="user-label">Email:</span> {user.email}</div>
          <div><span className="user-label">Username:</span> {user.username}</div>
          <div><span className="user-label">Es staff:</span> {user.is_staff ? "Sí" : "No"}</div>
        </div>
      </div>
    </div>
  );
}

export default User;
