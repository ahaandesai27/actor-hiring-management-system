const Location = require('../models/Location');

const LocationController = {
    create: async (req, res) => {
        const { latitude, longitude, name, freq_of_booking, rating, cost_of_booking, conditions } = req.body;
        try {
            const newLocation = await Location.create({
                latitude,
                longitude,
                name,
                freq_of_booking,
                rating,
                cost_of_booking,
                conditions
            });
            res.status(201).json(newLocation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const locations = await Location.findAll();
            res.status(200).json(locations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const { latitude, longitude } = req.params;
            const location = await Location.findOne({
                where: {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude)
                }
            });

            if (!location) {
                return res.status(404).json({ message: 'Location not found' });
            }

            res.status(200).json(location);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { latitude, longitude } = req.params;
            const updateData = req.body;

            const [updatedRows] = await Location.update(
                updateData,
                {
                    where: {
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude)
                    }
                }
            );

            if (updatedRows === 0) {
                return res.status(404).json({ message: "Location not found." });
            }

            res.status(200).json({ message: "Updated successfully." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { latitude, longitude } = req.params;

            const deletedRows = await Location.destroy({
                where: {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude)
                }
            });

            if (deletedRows === 0) {
                return res.status(404).json({ message: "Location not found." });
            }

            res.status(200).json({ message: "Deleted successfully." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = LocationController;