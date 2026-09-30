import {Link} from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function handleRegister(e) {
    e.preventDefault();

    setError("");

    try {
        const response = await fetch("http://localhost:4000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            navigate("/home");
        } else {
            setError(data.message);
        }

    } catch (error) {
        setError("Unable to connect to server");
    }
}

    return(
   <div className="form">
      <h1>Register</h1>

      <label className="email">Name:</label>
      <input
            type="text"
            placeholder="Enter your Name..."
            className='em'
            value={name}
            onChange={(e) => setName(e.target.value)}
      />

      <label className="email">Email:</label>
      <input
            type="text"
            placeholder="Enter your email..."
            className='em'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <label className='password'>Password:</label>
      <input
            type="password"
            placeholder="Enter your password..."
            className='pw'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
      />

      <button
          type="button"
          className='reg'
          onClick={handleRegister}
      >
          Register
      </button>

      <p>
          Already have an account?
          <Link to='/login' className='re'>Login</Link>
      </p>
   </div>
)
}

export default Register;