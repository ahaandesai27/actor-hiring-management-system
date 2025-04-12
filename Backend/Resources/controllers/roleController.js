const Roles = require("../models/roles");
const Film = require('../models/Films');
const { update } = require("./filmController");

const RoleController = {
    create: async (req, res) => {
        const {role_id, information, role_for, start_date, end_date, pay, creator, film_id} = req.body
        try{
            const newRole = await roles.create({
                role_id,
                information,
                role_for,
                start_date,
                end_date,
                pay,
                creator,
                film_id
            })
            res.status(201).json({newRole});
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try{
            const role_id  = req.params;
        const deletedRows = await roles.destroy({
            where: {role_id: role_id}
        });

        if(deletedRows === 0){
            res.status(404).json({message: "Role not found!!!"})
        }
        res.status(200).json({message: "Role deleted successfully"})
        }  catch(error){
            res.status(500).json({error: error.message});
        }
        
    }
}

module.exports = RoleController;