import { useState } from "react";
import "./ForgotPassword.css";


function ForgotPassword(){
    const [email,setEmail]=useState("");
    async function handleResetRequest() {
        console.log(email);
        const response = await fetch("http://localhost:4000/api/auth/forgot-password",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })  
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data.message);
        } else {
                // error
        }
    }

     return(
        <div className="form">
            <h1>Forgot Password</h1>
            <label className="email">Enter your Email: </label>
            <input
                type="email"
                placeholder="abc@gmail.com"
                className="em"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <p style={{ color: "gray", fontSize: "15px" }}>If this email is registered, a reset link will be sent to your email.</p>
            <button className="reset-btn" onClick={handleResetRequest}>Send Reset Link</button>
        </div>
     )
}

export default ForgotPassword;