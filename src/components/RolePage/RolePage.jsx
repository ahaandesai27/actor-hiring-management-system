import React, { useActionState, useEffect, useState } from "react";
import axios from 'axios';
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
        fetch('http://localhost:5000/roles')    
        .then((res) => res.json())
        .then((data) => setRoles(data));
    }, [])
    // arrow syntax for a function
    const sortRolesByDate = () => {
        // [...] creates a shallow copy, avoids direct changes
        // the thing inside sort is comparing the two dates, puts the 
        // newest one first
        // after which the states are updated.
        const sorted = [...roles].sort((a,b) => new Date(b.start_date) - new Date(a.start_date));
        setRoles(sorted);
        setSortByDate(true);
    };

    const applyForRole = async (role_id, role_for) => {
        const username = 'iamsrk'; // to be replaced with context
        const profession = 'actor';
        
        if (profession != role_for) {
            alert("Cannot apply for role!");
            return;
        }
        await axios.post('http://localhost:5000/professional/apply', {
            username,
            role_id
        });
        alert("Applied successfully!");
    }
    
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
                            <h3 className="movie-name">{role.Film.title}</h3>
                            <p><strong>Role Type:</strong> {role.information}</p>
                            <p><strong>Creator:</strong> {role.creator}</p>
                            <p><strong>Pay:</strong> {role.pay}</p>
                            <p><strong>Role for:</strong>{role.role_for}</p>
                            <p><strong>Start Date:</strong> {new Date(role.start_date).toLocaleDateString()}</p>
                            <p><strong>Start Date:</strong> {new Date(role.end_date).toLocaleDateString()}</p>

                            <button style={{ width: '140px', textAlign: 'left', padding: '8px 12px', marginTop: '10px' }} onClick={() => {applyForRole(role.role_id, role.role_for)}}>
                                <div align='center'>
                                    Apply for role
                                </div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default RolePage