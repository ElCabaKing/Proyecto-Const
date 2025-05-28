import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

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
            className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
        >
            <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

            <div className="form-control w-full">
                <input
                    className="input input-bordered w-full"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-control w-full">
                <input
                    className="input input-bordered w-full"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    disabled={loading}
                />
            </div>

            <button
                className={`btn btn-primary w-full ${loading ? "btn-disabled loading" : ""}`}
                type="submit"
                disabled={loading}
            >
                {loading ? "Processing..." : "Login"}
            </button>
        </form>
    );
}

export default FormularioLogin;
