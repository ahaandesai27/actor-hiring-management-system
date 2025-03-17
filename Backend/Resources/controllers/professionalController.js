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
            res.status(201).json(Professionals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOne: async (req, res) => {

    },
    update: async (req, res) => {

    },
    delete: async (req, res) => {

    }
}

module.exports = ProfessionalController;