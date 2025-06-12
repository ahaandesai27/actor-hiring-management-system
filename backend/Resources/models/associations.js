const Professional = require('./Professional.js');
const Film = require('./Films.js');
const WorkedOn = require('./WorkedOn.js');
const Connections = require('./Connections.js');
const roles = require('./Roles.js');
const Applications = require('./Applications.js');
const Posts = require('./Posts.js');
const ProfessionalLikes = require('./ProfessionalLikes.js');

// Films
Professional.belongsToMany(Film, { through: WorkedOn, foreignKey: 'professional', otherKey: 'film' });
Film.belongsToMany(Professional, { through: WorkedOn, foreignKey: 'film', otherKey: 'professional' });

// Connections
Professional.belongsToMany(Professional, {
  as: 'connections',
  through: Connections,
  foreignKey: 'professional1',
  otherKey: 'professional2',
});

// For roles
Professional.belongsToMany(roles, {through: Applications, foreignKey: 'professional', otherKey: 'role_id'});
roles.belongsToMany(Professional, {through: Applications, foreignKey: 'role_id', otherKey: 'professional'});
Professional.hasMany(roles, {
  foreignKey: 'creator',
  as: 'createdRoles'
});
roles.belongsTo(Professional, {
  foreignKey: 'creator',
  as: 'creatorDetails'
});
roles.belongsTo(Film, { foreignKey: 'film_id' });
roles.belongsTo(Professional, {
  foreignKey: 'offered_to'
})

// Applications and Roles associations
Applications.belongsTo(roles, { foreignKey: 'role_id' });
roles.hasMany(Applications, { foreignKey: 'role_id' });


// for posts
Professional.belongsToMany(Posts, { through: ProfessionalLikes, foreignKey: 'professional', otherKey: 'post_id' });
Posts.belongsToMany(Professional, { through: ProfessionalLikes, foreignKey: 'post_id', otherKey: 'professional' });
ProfessionalLikes.belongsTo(Posts, { foreignKey: 'post_id', as: 'Post' });
ProfessionalLikes.belongsTo(require('./Professional.js'), { foreignKey: 'professional', as: 'Professional' });