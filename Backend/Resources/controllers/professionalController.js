const Professional = require('../models/Professional');
const Film = require('../models/Films');
const connectionsController = require('../controllers/connectionsController');
require('../models/associations');

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
          const { username } = req.params;
          const professional = await Professional.findByPk(username);
      
          if (!professional) {
            return res.status(404).json({ message: 'Professional not found' });
          }
      
          const followerCount = await connectionsController.getFollowersCount(professional.username);
          const followingCount = await connectionsController.getFollowingCount(professional.username);
      
          res.status(200).json({
            followerCount,
            followingCount,
            ...professional.get() // extracts clean dataValues only
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      
    

    getFilms: async (req, res) => {
        try {
          const {username} = req.params;
          const professional = await Professional.findOne({
            where: { username },
            attributes: ['username'],
            include: {
                model: Film,
                attributes: ['title', 'genre', 'release_date', 'rating'],        // include film fields
                through: { attributes: ['start_date', 'end_date'] }              // worked on fields
            },
          })
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

// object = {username: ahaan, password desai}
// const {username} = object


