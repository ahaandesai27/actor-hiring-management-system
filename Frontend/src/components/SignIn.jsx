import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card"
import "./SignInstyles.css";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // this is an arrow function syntax:
    // the handlesignin is a variable (const)
    // e stands for the event object, will be triggered when form filled
    const HandleSignIn = (e) => {
        // below prevents default form submission
        e.preventDefault();
        console.log("email: ", email);
        console.log("password: ", password);
        // add signin logic once db made
    };

    // actual function logic here:
    return (
        <div className="signin-wrapper">
            <Card className="signin-card">
                <CardContent>
                    <h2 className="title">Sign-In</h2>
                    <form onSubmit={HandleSignIn} className="signin-form">
                        <Input 
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" className="signin-button">Sign In</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default SignIn