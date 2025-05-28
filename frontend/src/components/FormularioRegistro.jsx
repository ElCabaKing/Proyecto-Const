import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function FormularioRegistro({ route }) {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isStaff, setIsStaff] = useState(false); // false = user, true = admin
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
            className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
        >
            <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

            <div className="form-control w-full">
                <input
                    className="input input-bordered w-full"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-control w-full">
                <input
                    className="input input-bordered w-full"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-control w-full">
                <input
                    className="input input-bordered w-full"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    disabled={loading}
                />
            </div>

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

            <div className="form-control w-full">
                <div className="flex gap-4">
                    <label className="cursor-pointer flex items-center">
                        <input
                            type="radio"
                            className="radio radio-primary"
                            value={false}
                            checked={!isStaff}
                            onChange={() => setIsStaff(false)}
                            disabled={loading}
                        />
                        <span className="ml-2">User</span>
                    </label>
                    <label className="cursor-pointer flex items-center">
                        <input
                            type="radio"
                            className="radio radio-secondary"
                            value={true}
                            checked={isStaff}
                            onChange={() => setIsStaff(true)}
                            disabled={loading}
                        />
                        <span className="ml-2">Admin</span>
                    </label>
                </div>
            </div>

            <button
                className={`btn btn-primary w-full ${loading ? "btn-disabled loading" : ""}`}
                type="submit"
                disabled={loading}
            >
                {loading ? "Processing..." : "Register"}
            </button>
        </form>
    );
}

export default FormularioRegistro;
