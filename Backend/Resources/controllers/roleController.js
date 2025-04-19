const roles = require("../models/Roles");
const Professional = require("../models/Professional");
const Film = require('../models/Films');

require('../models/associations');

const RoleController = {
    create: async (req, res) => {
        const { role_id, information, role_for, start_date, end_date, pay, creator, film_id } = req.body;
        try {
            const newRole = await roles.create({
                role_id,
                information,
                role_for,
                start_date,
                end_date,
                pay,
                creator,
                film_id
            });
            res.status(201).json({ newRole });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { role_id } = req.params;
            const deletedRows = await roles.destroy({
                where: { role_id: role_id }
            });

            if (deletedRows === 0) {
                res.status(404).json({ message: "Role not found!!!" });
            }
            res.status(200).json({ message: "Role deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        const { role_id } = req.params;
        const { information, role_for, start_date, end_date, pay, creator, film_id } = req.body;
        try {
            const updatedRows = await roles.update(
                { information, role_for, start_date, end_date, pay, creator, film_id },
                { where: { role_id: role_id } }
            );

            if (updatedRows[0] === 0) {
                res.status(404).json({ message: "Role not found or no changes made!" });
            } else {
                res.status(200).json({ message: "Role updated successfully" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const role = await roles.findAll({
                include: {
                    model: Film,
                    attributes: ['film_id', 'title']
                },
                attributes: {
                    exclude: ['film_id']
                },
            });
            

            if (!role) {
                return res.status(404).json({ message: "Role not found!" });
            } else {
                return res.status(200).json(role);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }    
    },
    getOne: async (req, res) => {
        const { role_id } = req.params;
        try {
            const role = await roles.findOne({ where: { role_id: role_id } });

            if (!role) {
                res.status(404).json({ message: "Role not found!" });
            } else {
                res.status(200).json(role);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }, 
    viewApplicants: async (req, res) => {
        const {role_id} = req.params;
        try {
          const applicants = await roles.findAll({
            where: {role_id},
            attributes: ['role_id', 'role_for'],
            include: {
                model: Professional,
                attributes: ['username', 'rating'],

            }
          })
          res.status(200)
             .json(applicants);
        } catch (error) {
            res.status(500).json({ error: error.message });
          }                        
    }
};

module.exports = RoleController;