const Connections = require('../models/Connections');

const connectionsController = {
    followProfessional: async (req, res) => {
        try {
          const {professional1, professional2} = req.body;
          await Connections.create({
            professional1,
            professional2
          });
          res.status(200).json({message: "Followed successfully"});
        } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },

    unfollowProfessional: async (req, res) => {
        try {
          const { professional1, professional2 } = req.body;
          await Connections.destroy({
            where: {
              professional1,
              professional2
            }
          });
          res.status(200).json({ message: "Unfollowed successfully" });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      
    getFollowing: async (req, res) => {
        try {
          const {professional} = req.params;
          let connections = await Connections.findAll({
            where: {
                professional1: professional
            },
            attributes: ['professional2']
          })
          connections = connections.map(c => c.professional2)
          res.status(200)
             .json(connections);
          // return length(connections);     // for other information
        } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },

    getSingleFollow: async(req, res) => {
      try {
        const { professional1, professional2 } = req.query;
        const connection = await Connections.findOne({
          where: {
            professional1,
            professional2
          }
        });
        res.status(200).json({ isFollowing: !!connection });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    getFollowers: async (req, res) => {
      try {
        const {professional} = req.params;
        const connections = await Connections.findAll({
          where: {
              professional2: professional
          },
          attributes: ['professional1']
        })
        res.status(200)
           .json(connections.map(c => c.professional1));
        // return length(connections);     // for other information
      } catch (error) {
          res.status(500).json({ error: error.message });
        }
    },

    getFollowersCount: async (professional) => {
      const count = await Connections.count({
        where: { professional2: professional }
      });
      return count;
    },
    
    getFollowingCount: async (professional) => {
      const count = await Connections.count({
        where: { professional1: professional }
      });
      return count;
    }
}

module.exports = connectionsController