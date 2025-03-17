const Professional = require('../models/Professional');

const ProfessionalController = {
    create: async (req, res) => {
        const {username, fullName, profession, years_of_experience, rating} = req.body;
        try {
            const newProfessional = await Professional.create({
                username,
                full_name: fullName,
                profession,
                years_of_experience,
                rating
            });
            res.status(201).json(newProfessional);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const Professionals = await Professional.findAll();
            res.status(200).json(Professionals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const {username} = req.params;
            const professional = await Professional.findByPk(username);
            res.status(200).json(professional);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const {username} = req.params;
            const {info} = req.body;    
            await Professional.update(
                info,
                {
                    where: {
                        username: username
                    }
                }
            )
            res.status(200).json("Updated successfully.");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { username } = req.params;
    
            const deletedRows = await Professional.destroy({
                where: { username: username }
            });
    
            if (deletedRows === 0) {
                return res.status(404).json({ message: "Professional not found." });
            }
    
            res.status(200).json({ message: "Deleted successfully." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProfessionalController;