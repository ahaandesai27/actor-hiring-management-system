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