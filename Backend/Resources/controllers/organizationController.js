const Organization = require('../models/Organization');
const Professional = require('../models/Professional');

const OrganizationController = {
    create: async (req, res) => {
        const { org_id, name, number_of_employees, owner } = req.body;
        try {
            // If owner is provided, verify it exists in the Professional table
            if (owner) {
                const ownerExists = await Professional.findByPk(owner);
                if (!ownerExists) {
                    return res.status(400).json({ error: "Owner doesn't exist in Professionals" });
                }
            }

            const newOrganization = await Organization.create({
                org_id,
                name,
                number_of_employees,
                owner
            });
            
            res.status(201).json(newOrganization);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const organizations = await Organization.findAll({
                include: [{
                    model: Professional,
                    attributes: ['username', 'full_name', 'profession'],
                    required: false
                }]
            });
            res.status(200).json(organizations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const { org_id } = req.params;
            
            const organization = await Organization.findByPk(org_id, {
                include: [{
                    model: Professional,
                    attributes: ['username', 'full_name', 'profession'],
                    required: false
                }]
            });

            if (!organization) {
                return res.status(404).json({ message: 'Organization not found' });
            }

            res.status(200).json(organization);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { org_id } = req.params;
            const updateData = req.body;
            
            // If owner is being updated, verify the new owner exists
            if (updateData.owner) {
                const ownerExists = await Professional.findByPk(updateData.owner);
                if (!ownerExists) {
                    return res.status(400).json({ error: "New owner doesn't exist in Professionals" });
                }
            }

            const [updatedRows] = await Organization.update(
                updateData,
                {
                    where: { org_id: org_id }
                }
            );

            if (updatedRows === 0) {
                return res.status(404).json({ message: "Organization not found." });
            }

            res.status(200).json({ message: "Updated successfully." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { org_id } = req.params;

            const deletedRows = await Organization.destroy({
                where: { org_id: org_id }
            });

            if (deletedRows === 0) {
                return res.status(404).json({ message: "Organization not found." });
            }

            res.status(200).json({ message: "Deleted successfully." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = OrganizationController;