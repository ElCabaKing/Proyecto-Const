import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import '../styles/General.css';

function FormularioRegistro({ route }) {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isStaff, setIsStaff] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = { first_name, last_name, username, password, email, is_staff: isStaff };
            await api.post(route, data);
            alert("User successfully registered!");
            navigate("/login");
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="register-form"
        >
            <h1 className="register-title">Register</h1>

            <div className="register-field">
                <input
                    className="register-input"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                    disabled={loading}
                />
            </div>

            <div className="register-field">
                <input
                    className="register-input"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                    disabled={loading}
                />
            </div>

            <div className="register-field">
                <input
                    className="register-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    disabled={loading}
                />
            </div>

            <div className="register-field">
                <input
                    className="register-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    disabled={loading}
                />
            </div>

            <div className="register-field">
                <input
                    className="register-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    disabled={loading}
                />
            </div>

            <div className="register-field">
                <div className="register-radio-group">
                    <label className="register-radio-label">
                        <input
                            type="radio"
                            className="register-radio"
                            value={false}
                            checked={!isStaff}
                            onChange={() => setIsStaff(false)}
                            disabled={loading}
                        />
                        <span>User</span>
                    </label>
                    <label className="register-radio-label">
                        <input
                            type="radio"
                            className="register-radio"
                            value={true}
                            checked={isStaff}
                            onChange={() => setIsStaff(true)}
                            disabled={loading}
                        />
                        <span>Admin</span>
                    </label>
                </div>
            </div>

            <button
                className="register-btn"
                type="submit"
                disabled={loading}
            >
                {loading ? "Processing..." : "Register"}
            </button>
        </form>
    );
}

export default FormularioRegistro;
