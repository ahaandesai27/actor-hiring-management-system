import React, { useState } from "react";
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
            <div className="signin-card">
                <div className="signin-card-content">
                    <h2 className="title">Sign-In</h2>
                    <form onSubmit={HandleSignIn} className="signin-form">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="signin-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="signin-input"
                        />
                        <button type="submit" className="signin-button">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn