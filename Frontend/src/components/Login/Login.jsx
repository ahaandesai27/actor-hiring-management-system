import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const HandleLogin = async (e) => {
        e.preventDefault()
        console.log("username:", username);
        console.log("password: ", password);
        // actual login logic 
        try {
            // the path given will be added as an api route, so this shld work
            const response = await fetch("/api/professionals/check-username", {
                method:"POST",
                headers: {
                    "Content-type": "application/json"
                },
                body:JSON.stringify({ username })
            });
            const data = await response.json();
            if(response.status == 200) {
                // username exists
                console.log("username found");
                alert("Hello, "+ data.fullName);
                // login logic
                navigate("/main");
            }
            else {
                console.log(data.message);
            }
        }
        catch(error) {
            console.error("Error: ", error);
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="card-content">
                    <h2 className="title">Login</h2>
                    <form onSubmit={HandleLogin} className="login-form">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="input"
                        />
                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input"
                        />
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login