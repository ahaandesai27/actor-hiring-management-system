const Professional = require('../models/Professional');
const Film = require('../models/Films');
const connectionsController = require('../controllers/connectionsController');
const WorkedOn = require('../models/WorkedOn');

const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

require('../models/associations');

const hashPassword = async (plainTextPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
  return hashedPassword;
};

const ProfessionalController = {
    create: async (req, res) => {
        console.log("WE here!");
        const {username, full_name, profession, years_of_experience, rating, profile_picture, password} = req.body;
        const storedPassword = await hashPassword(password);
        try {
            const newProfessional = await Professional.create({
                username,
                full_name,
                profession,
                years_of_experience,
                rating,
                profile_picture,
                password: storedPassword
            });
            res.status(201)
               .json(newProfessional);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
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
            ...professional.get()
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
                attributes: ['title', 'genre', 'release_date', 'rating'],
                through: { attributes: ['start_date', 'end_date'] }
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
    },

    getByUsername: async (req, res) => {
        const { username } = req.body;
        
        try {
            const professional = await Professional.findOne({
                where: { username }
            });

            if (!professional) {
                return res.status(404).json({ message: 'Username not found' });
            }
            
            res.status(200).json({ message: 'Username exists' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    searchUsername: async (req, res) => {
        const {prefix} = req.params;
        if (!prefix) {
        return res.status(200)
                    .json({"professionals": []});
        }

        try {
            const professionals = await Professional.findAll({
                where: {
                    username: {
                        [Op.like]: `${prefix}%`
                    }
                },
                attributes: ['username', 'full_name', 'profession', 'profile_picture'],
                limit: 10 // Limit results for performance
            });

            return res.status(200).json({"professionals": professionals});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProfessionalController;

// object = {username: ahaan, password desai}
// const {username} = object


