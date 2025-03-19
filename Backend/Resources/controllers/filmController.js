const Film = require('../models/Films');
const Professional = require('../models/Professional');
require('../models/associations');

const FilmController = {
    create: async (req, res) => {
        const { film_id, title, genre, summary, rating, release_date, org_id } = req.body;
        try {
            const newFilm = await Film.create({
                film_id,
                title,
                genre,
                summary,
                rating,
                release_date,
                org_id
            });
            res.status(201).json(newFilm);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const films = await Film.findAll();
            res.status(200).json(films);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const { film_id } = req.params;
            const film = await Film.findByPk(film_id);
            if (!film) {
                return res.status(404).json({ message: "Film not found." });
            }
            res.status(200).json(film);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getProfessionals: async (req, res) => {
        try {
            const { film_id } = req.params;
            const film = await Film.findOne({
                where: {film_id},
                attributes: ['film_id', 'title'],
                include: {
                    model: Professional,
                    attributes: ['username', 'rating'],
                    through: {attributes: ['start_date', 'end_date']}
                }
            });
            if (!film) {
                return res.status(404).json({ message: "Film not found." });
            }
            res.status(200).json(film);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { film_id } = req.params;
            const { info } = req.body;
            const [updatedRows] = await Film.update(info, {
                where: { film_id: film_id }
            });
            if (updatedRows === 0) {
                return res.status(404).json({ message: "Film not found or no changes made." });
            }
            res.status(200).json({ message: "Updated successfully." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { film_id } = req.params;
            const deletedRows = await Film.destroy({
                where: { film_id: film_id }
            });
            if (deletedRows === 0) {
                return res.status(404).json({ message: "Film not found." });
            }
            res.status(200).json({ message: "Deleted successfully." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = FilmController;
