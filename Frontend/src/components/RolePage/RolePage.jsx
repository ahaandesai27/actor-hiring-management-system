import React, { useActionState, useEffect, useState } from "react";
import './RolePagestyles.css'

function RolePage() {
    // initially empty
    const [roles, setRoles] = useState([])
    // initially false
    const [sortedByDate, setSortByDate] = useState(false)
    

    // this is a useEffect, this thing will run only once 
    // per page reload
    // this is used because we want to get the roles data only 
    // once. '[]' has been put to tell react to run this only when it empty
    // ie. when first opened or reloaded 
    useEffect(() => {
        // put the actual db path here
        fetch('./api/roles')
        .then((res) => res.json())
        .then((data) => setRoles(data));
    }, [])
    // arrow syntax for a function
    const sortRolesByDate = () => {
        // [...] creates a shallow copy, avoids direct changes
        // the thing inside sort is comparing the two dates, puts the 
        // newest one first
        // after which the states are updated.
        const sorted = [...roles].sort((a,b) => new Date(b.date) - new Date(a.date));
        setRoles(sorted);
        setSortByDate(true);
    };

    return (
        <div>
            <div className="roles-wrapper">
                <h2 className="roles-header">Available Roles</h2>
                <button className="sort-button" onClick={sortRolesByDate}>Sort By Date</button>
            </div>
            {/* the map is used to go thru each element obtained from
                    the DB
                    it is all wrapped inside a Card element
                    the key={index} is required so that react can identify them
                    the .toLocaleString() is used to convert it into readable date */}
            <div className="roles-list">
                {roles.map((role, index) => (
                    <div key={index} className="role-card">
                        <div className="role-card-content">
                            <h3 className="movie-name">{role.movieName}</h3>
                            <p><strong>Role Type:</strong> {role.name}</p>
                            <p><strong>Creator:</strong> {role.creator}</p>
                            <p><strong>Pay:</strong> {role.pay}</p>
                            <p><strong>Creation Date:</strong> {new Date(role.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default RolePage