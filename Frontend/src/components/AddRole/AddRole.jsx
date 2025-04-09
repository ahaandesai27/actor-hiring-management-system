import React, { useState } from "react";
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
    };

    return (
        <div className="addrole-wrapper">
            <h2 className="addrole-header">Add Roles Here</h2>
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
        </div>
    );
}

export default AddRole