import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const HandleLogin = (e) => {
        e.preventDefault()
        console.log("username:", username);
        console.log("password: ", password);
        // actual login logic 
        // will compare the username with the username stored with the email 
        // in a relation
    }

    return (
        <div className="login-wrapper">
            <Card className="login-card">
                <CardContent>
                    <h2 className="title">Login</h2>
                    <form onSubmit={HandleLogin} className="login-form">
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="Submit" className="login-button">Login</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login