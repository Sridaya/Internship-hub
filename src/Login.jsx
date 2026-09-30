import './Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function handleLogin() {
        setError("");

        try {
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("isLoggedIn", "true");

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                navigate("/home");

            } else {
                setError("*" + data.message);
            }

        } catch (error) {
            setError("Unable to connect to server");
        }
    }

    return (
        <div className="form">
            <h1>Login</h1>

            <label className="email">Email:</label>

            <input
                type="text"
                placeholder="Enter your email..."
                className="em"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label className="password">Password:</label>

            <input
                type="password"
                placeholder="Enter your password..."
                className="pw"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <Link to="/forgot-password" className="fp">
                Forgot password
            </Link>

            <button
                type="button"
                className="login"
                onClick={handleLogin}
            >
                Login
            </button>

            <p>
                Don't have an account?
                <Link to="/register" className="re">
                    Register
                </Link>
            </p>
        </div>
    );
}

export default Login;