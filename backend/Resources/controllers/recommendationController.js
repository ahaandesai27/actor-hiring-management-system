const Connections = require('../models/Connections');
const roles = require('../models/Roles');
const Film = require('../models/Films');
const Post = require('../models/Posts');
const { Op } = require('sequelize');

require('../models/associations');

const RecommendationController = {
    getRecommendedRoles: async(req, res) => {
        const {professional} = req.params;
        try {
            let followers = await Connections.findAll({
                where: {
                    professional1: professional
                },
                attributes: ['professional2']
            });
            
            let recommendedRoles = [];
            let addedRoleIds = new Set(); // Track added role IDs to avoid duplicates
            
            for (const follower of followers) {
              let createdRoles = await roles.findAll({
                where: { creator: follower.professional2 },
                include: {
                    model: Film,
                    attributes: ['film_id', 'title']
                },
                attributes: {
                    exclude: ['film_id']
                },
                });

                // Add only unique roles
                for (const role of createdRoles) {
                    if (!addedRoleIds.has(role.role_id)) {
                        recommendedRoles.push(role);
                        addedRoleIds.add(role.role_id);
                    }
                }
            }
            
            // If we don't have enough roles, fetch additional ones from the database
            if (recommendedRoles.length < 10) {
                const additionalRoles = await roles.findAll({
                    where: {
                        role_id: {
                            [Op.notIn]: Array.from(addedRoleIds)
                        }
                    },
                    include: {
                        model: Film,
                        attributes: ['film_id', 'title']
                    },
                    attributes: {
                        exclude: ['film_id']
                    },
                    limit: 10 - recommendedRoles.length
                });
                
                recommendedRoles.push(...additionalRoles);
            }
            
            return res.status(200).json(recommendedRoles);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
          }
    },

    getRecommendedPosts: async(req, res) => {
        const {professional} = req.params;
        try {
            let followers = await Connections.findAll({
                where: {
                    professional1: professional
                },
                attributes: ['professional2']
            });
            
            let recommendedPosts = [];
            let addedPostIds = new Set(); // Track added post IDs to avoid duplicates
            
            for (const follower of followers) {
                let createdPosts = await Post.findAll({
                    where: { creator: follower.professional2 },
                    order: [['time', 'DESC']]
                });

                // Add only unique posts
                for (const post of createdPosts) {
                    if (!addedPostIds.has(post.post_id)) {
                        recommendedPosts.push(post);
                        addedPostIds.add(post.post_id);
                    }
                }
            }
            
            // If we don't have enough posts, fetch additional ones from the database
            if (recommendedPosts.length < 10) {
                const additionalPosts = await Post.findAll({
                    where: {
                        post_id: {
                            [Op.notIn]: Array.from(addedPostIds)
                        }
                    },
                    order: [['time', 'DESC']],
                    limit: 10 - recommendedPosts.length
                });
                
                recommendedPosts.push(...additionalPosts);
            }
            
            // Sort all recommended posts by time descending after combining
            recommendedPosts.sort((a, b) => new Date(b.time) - new Date(a.time));
            
            return res.status(200).json(recommendedPosts);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = RecommendationController;