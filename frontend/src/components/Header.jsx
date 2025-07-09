import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import '../styles/General.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    api.get("/api/getUser/")
      .then(res => {
        if (res.data && res.data.username) setActiveUser(res.data.username);
      })
      .catch(() => setActiveUser(null));
  }, []);

  return (
    <header className="header">
      <div
        className="header-title"
        onClick={() => navigate("/")}
      >
        PizarraApp
      </div>
      <nav className="header-nav">
        <button
          className={`header-btn${location.pathname === "/" ? " active" : ""}`}
          onClick={() => navigate("/")}
        >
          Inicio
        </button>
        {activeUser && (
          <button
            className={`header-btn${location.pathname.startsWith("/user") ? " active" : ""}`}
            onClick={() => navigate(`/user/${activeUser}`)}
          >
            Perfil
          </button>
        )}
        <button
          className="header-btn logout"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}




export default Header;
