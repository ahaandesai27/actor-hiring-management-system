const Professional = require('../models/Professional');
const roles = require('../models/Roles');
const Applications = require('../models/Applications');
const Film = require('../models/Films');

require('../models/associations');

const RoleApplicationController = {
    applyForRole: async (req, res) => {
        try {
            const username = req.body.username;
            const role_id = parseInt(req.body.role_id);
            const audition_url = req.body.audition_url;
            const paragraph = req.body.paragraph;

            console.log(username, role_id, audition_url, paragraph);

            const professional = await Professional.findByPk(username);
            const role = await roles.findByPk(role_id);

            if (!professional || !role) {
                return res.status(404)
                    .json({ message: "Professional or role not found" });
            }
            else if (professional.profession !== role.role_for) {
                return res.status(403)
                    .json({ message: "Cannot apply for this role!" });
            }

            // Check if already applied
            const existingApplication = await Applications.findOne({
                where: { professional: username, role_id }
            });

            if (existingApplication) {
                return res.status(409)
                    .json({ message: "You have already applied for this role!" });
            }

            await Applications.create({
                professional: username,
                role_id,
                audition_url,
                paragraph
            });

            return res.status(201)
                .json({ message: "Applied successfully!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },

    withdrawApplication: async (req, res) => {
        try {
            const username = req.query.username;
            const role_id = parseInt(req.query.role_id);

            // Check if the application exists
            const application = await Applications.findOne({
                where: { professional: username, role_id }
            });

            if (!application) {
                return res.status(404).json({ error: "Application not found" });
            }

            // Delete the application
            await application.destroy();

            res.status(200).json({ success: "Application withdrawn successfully!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCreatedRoles: async (req, res) => {
        try {
            const { username } = req.params;

            const createdRoles = await roles.findAll({
                where: { creator: username },
                include: {
                    model: Film,
                    attributes: ['film_id', 'title']
                },
                attributes: {
                    exclude: ['film_id']
                }
            });

            if (!createdRoles || createdRoles.length === 0) {
                return res.status(404).json({ message: 'No roles found for this professional' });
            }

            return res.status(200).json(createdRoles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAppliedRoles: async (req, res) => {
        try {
            const { username } = req.params;

            const appliedRoles = await Applications.findAll({
                where: { professional: username },
                include: [
                    {
                        model: roles,
                        include: {
                            model: Film,
                            attributes: ['film_id', 'title']
                        }
                    }
                ],
                attributes: ['audition_url', 'paragraph']
            });

            if (!appliedRoles || appliedRoles.length === 0) {
                return res.status(404).json({ message: 'No applications found for this professional' });
            }

            // Transform the data to flatten the structure
            const flattenedRoles = appliedRoles.map(application => ({
                ...application.Role.dataValues,
                Film: application.Role.Film,
                audition_url: application.audition_url,
                paragraph: application.paragraph
            }));

            return res.status(200).json(flattenedRoles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    viewApplicants: async (req, res) => {
        const { role_id } = req.params;
        try {
            const applicants = await roles.findAll({
                where: { role_id },
                attributes: ["role_id", "role_for", "creator"],
                include: {
                    model: Professional,
                    attributes: ["username", "rating"],
                },
            });
            res.status(200).json(applicants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    setOfferedTo: async (req, res) => {
        const { role_id } = req.params;
        const { offered_to } = req.body;
        console.log(role_id, offered_to);

        try {
            const updatedRows = await roles.update(
                { offered_to },
                { where: { role_id: role_id } }
            );

            if (updatedRows[0] === 0) {
                return res.status(404).json({ message: "Role not found!" });
            }

            return res.status(200).json({ message: "Role offered successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = RoleApplicationController;