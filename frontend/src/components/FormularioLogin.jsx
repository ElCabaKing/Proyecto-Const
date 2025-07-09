import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/General.css';

function FormularioLogin({ route }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post(route, { username, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/");
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="login-form"
        >
            <h1 className="login-title">Login</h1>

            <div className="login-field">
                <input
                    className="login-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    disabled={loading}
                />
            </div>

            <div className="login-field">
                <input
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    disabled={loading}
                />
            </div>
            <div className="login-field">
                <button
                    className="login-btn"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Login"}
                </button>
            </div>
        </form>
    );
}

export default FormularioLogin;
