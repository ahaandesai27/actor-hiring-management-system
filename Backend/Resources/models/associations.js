const Professional = require('./Professional.js');
const Film = require('./Films.js');
const WorkedOn = require('./WorkedOn.js');
const Connections = require('./Connections.js');

Professional.belongsToMany(Film, { through: WorkedOn, foreignKey: 'professional', otherKey: 'film' });
Film.belongsToMany(Professional, { through: WorkedOn, foreignKey: 'film', otherKey: 'professional' });
Professional.belongsToMany(Professional, {
    as: 'connections',
    through: Connections,
    foreignKey: 'professional1',
    otherKey: 'professional2',
  });