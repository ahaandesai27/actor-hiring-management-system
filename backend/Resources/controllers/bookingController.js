const Booking = require('../models/Booking');
const Organization = require('../models/Organization');
const Location = require('../models/Location');

const BookingController = {
    create: async (req, res) => {
        const { latitude, longitude, org_id, startbookingdate, endbookingdate } = req.body;
        try {
            // Verify organization exists
            const organizationExists = await Organization.findByPk(org_id);
            if (!organizationExists) {
                return res.status(400).json({ error: "Organization doesn't exist" });
            }

            // Verify location exists
            const locationExists = await Location.findOne({
                where: {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude)
                }
            });
            if (!locationExists) {
                return res.status(400).json({ error: "Location doesn't exist" });
            }

            const newBooking = await Booking.create({
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                org_id,
                startbookingdate,
                endbookingdate
            });
            
            res.status(201).json(newBooking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const bookings = await Booking.findAll({
                include: [
                    {
                        model: Organization,
                        attributes: ['name']
                    },
                    {
                        model: Location,
                        attributes: ['name']
                    }
                ]
            });
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const { latitude, longitude, org_id } = req.params;
            
            const booking = await Booking.findOne({
                where: {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    org_id: parseInt(org_id)
                },
                include: [
                    {
                        model: Organization,
                        attributes: ['name', 'number_of_employees']
                    },
                    {
                        model: Location,
                        attributes: ['name', 'rating', 'cost_of_booking']
                    }
                ]
            });

            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { latitude, longitude, org_id } = req.params;
            const { startbookingdate, endbookingdate } = req.body;

            const [updatedRows] = await Booking.update(
                { startbookingdate, endbookingdate },
                {
                    where: {
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        org_id: parseInt(org_id)
                    }
                }
            );

            if (updatedRows === 0) {
                return res.status(404).json({ message: "Booking not found." });
            }

            res.status(200).json({ message: "Updated successfully." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { latitude, longitude, org_id } = req.params;

            const deletedRows = await Booking.destroy({
                where: {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    org_id: parseInt(org_id)
                }
            });

            if (deletedRows === 0) {
                return res.status(404).json({ message: "Booking not found." });
            }

            res.status(200).json({ message: "Deleted successfully." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get bookings by organization
    getBookingsByOrganization: async (req, res) => {
        try {
            const { org_id } = req.params;
            
            const bookings = await Booking.findAll({
                where: { org_id: parseInt(org_id) },
                include: [
                    {
                        model: Location,
                        attributes: ['name', 'rating', 'cost_of_booking']
                    }
                ]
            });

            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get bookings by location
    getBookingsByLocation: async (req, res) => {
        try {
            const { latitude, longitude } = req.params;
            
            const bookings = await Booking.findAll({
                where: {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude)
                },
                include: [
                    {
                        model: Organization,
                        attributes: ['name', 'number_of_employees']
                    }
                ]
            });

            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = BookingController;