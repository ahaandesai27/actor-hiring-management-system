import React, { useState } from "react";
import './styles.css';

function AddRole() {
    const [role, setRole] = useState({
        movieName: "",
        type: "",
        creator: "",
        pay: "",
        date: ""
    });

    const getRole = (e) => {
        e.preventDefault();
        console.log('role added', role);
        // add actual logic here
        setRole({
            movieName: "",
            type: "",
            creator: "",
            pay: "",
            date: ""
        });
    };

    return (
        <div className="addrole-wrapper">
            <h2 className="addrole-header">Create a new role</h2>
            <div className="addrole-card">
                <form onSubmit={getRole} className="addrole-form">
                    <input
                        type="text"
                        placeholder="Movie Name"
                        value={role.movieName}
                        onChange={(e) => setRole({ ...role, movieName: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Role Type"
                        value={role.type}
                        onChange={(e) => setRole({ ...role, type: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Role Creator"
                        value={role.creator}
                        onChange={(e) => setRole({ ...role, creator: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Pay"
                        value={role.pay}
                        onChange={(e) => setRole({ ...role, pay: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        value={role.date}
                        onChange={(e) => setRole({ ...role, date: e.target.value })}
                        required
                    />
                    <button type="submit" className="submit-role-button">Submit Role</button>
                </form>
            </div>
        </div>
    );
}

export default AddRole;
