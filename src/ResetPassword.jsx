import { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword(){

    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();
    const [success, setSuccess] = useState("");

    async function handleReset(){
        if(password!==confirmPassword){
            setError("Passwords do not match");
            return;
        }
        setError("");
        const response = await fetch("http://localhost:4000/api/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
                password: password
            })
        });
        const data = await response.json();

        if (!response.ok) {
            setError(data.message);
            return;
        }

        setSuccess(data.message);
    }

     return(
        <div className="form">
            <h1>Reset Password</h1>
            <label className="password">New Password</label>
            <input 
               type="password"
                className="pw"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <label className="password">Confirm Password</label>
            <input
               type="password"
               className="pw"
               value={confirmPassword}
               onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <button className="rp" onClick={handleReset}>Reset password</button>
        </div>
     )
}

export default ResetPassword;