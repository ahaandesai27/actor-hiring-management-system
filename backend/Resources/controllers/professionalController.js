const Professional = require('../models/Professional');
const Film = require('../models/Films');
const roles = require('../models/Roles.js');
const Applications = require('../models/Applications.js');
const connectionsController = require('../controllers/connectionsController');
const bcrypt = require('bcrypt');

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
                .json({message: "Professional or role not found"});
            }
            else if (professional.profession !== role.role_for) {
                return res.status(403)
                .json({message: "Cannot apply for this role!"});
            }
            
            // Check if already applied
            const existingApplication = await Applications.findOne({
                where: { professional: username, role_id }
            });
            
            if (existingApplication) {
                return res.status(409)
                .json({message: "You have already applied for this role!"});
            }
            
            await Applications.create({
                professional: username, 
                role_id,
                audition_url,
                paragraph
            });
            
            return res.status(201)
            .json({message: "Applied successfully!"}); 
        }  catch (error) {
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
        const { username } = req.body; // assuming you'll send username in request body
        
        try {
            const professional = await Professional.findOne({
                where: { username }
            });

            if (!professional) {
                return res.status(404).json({ message: 'Username not found' });
            }
            
            // If you want to also check the password, you can compare it here
            // const isPasswordCorrect = bcrypt.compareSync(password, professional.password);
            // if (!isPasswordCorrect) {
            //     return res.status(401).json({ message: 'Invalid password' });
            // }
            
            res.status(200).json({ message: 'Username exists' }); // or send back professional details
        } catch (error) {
            // whatever error is obtained will be put here
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
    }
    
    

}

module.exports = ProfessionalController;

// object = {username: ahaan, password desai}
// const {username} = object


