import React, { useState } from "react";
<<<<<<< HEAD
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent} from '@/components/ui/card'
import './AddRolestyles.css'

function AddRole() {
    const [role, setRole] = useState({
        movieName:"",
        type:"",
        creator:"",
        pay:"",
        date:""
    }); 

    const getRole = (e) => {
        e.preventDefault()
        console.log('role added', role)
        // add actual logic here
        setRole({
            movieName:"",
            type:"",
            creator:"",
            pay:"",
            date:""
        })
=======
import './AddRolestyles.css';

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
>>>>>>> 6db7af3 (removed shadCN UI and created new folders, changes made in the professionaldbcontroller)
    };

    return (
        <div className="addrole-wrapper">
            <h2 className="addrole-header">Add Roles Here</h2>
<<<<<<< HEAD
            <Card className="addrole-card">
                <CardContent>
                    <form onSubmit={getRole} className="addrole-form">
                        <Input
                            type='text'
                            placeholder='MovieName'
                            value={role.movieName}
                            onChange={(e) => setRole({...role, movieName: e.target.value})}
                            required
                        />
                        <Input
                            type='text'
                            placeholder='RoleType'
                            value={role.type}
                            onChange={(e) => setRole({...role, type: e.target.value})}
                            required
                        />
                        <Input
                            type='text'
                            placeholder='RoleCreator'
                            value={role.creator}
                            onChange={(e) => setRole({...role, creator: e.target.value})}
                            required
                        />
                        <Input
                            type='text'
                            placeholder='Pay'
                            value={role.pay}
                            onChange={(e) => setRole({...role, pay: e.target.value})}
                            required
                        />
                        <Input
                            type='date'
                            placeholder='CreationDate'
                            value={role.date}
                            onChange={(e) => setRole({...role, date: e.target.value})}
                            required
                        />
                        <Button type="submit" className="submit-role-button">Submit Role</Button>
                    </form>
                </CardContent>
            </Card>
=======
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
>>>>>>> 6db7af3 (removed shadCN UI and created new folders, changes made in the professionaldbcontroller)
        </div>
    );
}

<<<<<<< HEAD
export default AddRole
=======
export default AddRole;
>>>>>>> 6db7af3 (removed shadCN UI and created new folders, changes made in the professionaldbcontroller)
