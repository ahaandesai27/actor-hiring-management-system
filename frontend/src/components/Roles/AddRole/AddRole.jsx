import React, { useEffect, useState } from "react";
import './styles.css';
import { useUser } from "../../User/user";

function AddRole() {
    const {userRole} = useUser

    if (userRole !== "director" || userRole !== "producer") {
        return (
            <div className="">
                <h2>You are unable to add a role.</h2>
            </div>
        );
    }
    const [role, setRole] = useState({
        role_id: "",
        information: "",
        role_for: "",
        start_date: "",
        end_date: "",
        pay: "",
        creator: "",
        film_id: ""
    });

    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/film")
            .then(res => res.json())
            .then(data => setFilms(data))
            .catch(err => console.error("Failed to fetch films:", err));
    }, []);

    const getRole = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/roles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(role)
            });

            if (!response.ok) {
                throw new Error("Failed to create role");
            }

            const result = await response.json();
            console.log("Role added:", result);
            setRole({
                role_id: "",
                information: "",
                role_for: "",
                start_date: "",
                end_date: "",
                pay: "",
                creator: "",
                film_id: ""
            });
        } catch (err) {
            console.error("Error adding role:", err);
        }
    };

    return (
        <div className="addrole-wrapper">
            <h2 className="addrole-header">Create a new role</h2>
            <div className="addrole-card">
                <form onSubmit={getRole} className="addrole-form">
                    <input
                        type="number"
                        placeholder="Role ID"
                        value={role.role_id}
                        onChange={(e) => setRole({ ...role, role_id: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Information"
                        value={role.information}
                        onChange={(e) => setRole({ ...role, information: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Role For"
                        value={role.role_for}
                        onChange={(e) => setRole({ ...role, role_for: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        placeholder="Start Date"
                        value={role.start_date}
                        onChange={(e) => setRole({ ...role, start_date: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        placeholder="End Date"
                        value={role.end_date}
                        onChange={(e) => setRole({ ...role, end_date: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Pay"
                        value={role.pay}
                        onChange={(e) => setRole({ ...role, pay: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Creator"
                        value={role.creator}
                        onChange={(e) => setRole({ ...role, creator: e.target.value })}
                        required
                    />
                    <select
                        value={role.film_id}
                        onChange={(e) => setRole({ ...role, film_id: e.target.value })}
                        required
                        className="film-select"
                    >
                        <option value="">Select Film</option>
                        {films.map((film) => (
                            <option key={film.film_id} value={film.film_id}>
                                {film.title}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="submit-role-button">Submit Role</button>
                </form>
            </div>
        </div>
    );
}

export default AddRole;
