const Professional = require('./Professional.js');

// Films
const Film = require('./Films.js');
const WorkedOn = require('./WorkedOn.js');
Professional.belongsToMany(Film, { through: WorkedOn, foreignKey: 'professional', otherKey: 'film' });
Film.belongsToMany(Professional, { through: WorkedOn, foreignKey: 'film', otherKey: 'professional' });

// Connections
const Connections = require('./Connections.js');
Professional.belongsToMany(Professional, {
  as: 'connections',
  through: Connections,
  foreignKey: 'professional1',
  otherKey: 'professional2',
});

// For roles
const roles = require('./Roles.js');
const Applications = require('./Applications.js');
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
// organizations books locations

// for posts
const Posts = require('./Posts.js');
const ProfessionalLikes = require('./ProfessionalLikes.js');

Professional.belongsToMany(Posts, { through: ProfessionalLikes, foreignKey: 'professional', otherKey: 'post_id' });
Posts.belongsToMany(Professional, { through: ProfessionalLikes, foreignKey: 'post_id', otherKey: 'professional' });
ProfessionalLikes.belongsTo(Posts, { foreignKey: 'post_id', as: 'Post' });
ProfessionalLikes.belongsTo(require('./Professional.js'), { foreignKey: 'professional', as: 'Professional' });