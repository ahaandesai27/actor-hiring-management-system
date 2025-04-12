const Professional = require('../models/Professional');
const Film = require('../models/Films');
const roles = require('../models/Roles.js');
const Applications = require('../models/Applications.js');
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

    applyForRole: async(req, res) => {
        // setting this up as a query string route
        try {
            const username = req.query.username;
            const role_id = parseInt(req.query.role_id);
            const professional = await Professional.findByPk(username);
            const role = await roles.findByPk(role_id);
            if (!professional || !role) {
                res.status(404)
                   .json({error: "Professional or role not found"});
            }
            else if (professional.profession !== role.role_for) {
                res.status(403)
                   .json({forbidden: "Cannot apply for this role!"});
                 }
            await Applications.create({professional: username, role_id});
            res.status(201)
               .json({success: "Applied successfully!"}); 
        }  catch (error) {
            res.status(500).json({ error: error.message });
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


