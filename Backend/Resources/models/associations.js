const Professional = require('./Professional.js');
const Film = require('./Films.js');
const WorkedOn = require('./WorkedOn.js');

Professional.belongsToMany(Film, { through: WorkedOn, foreignKey: 'professional', otherKey: 'film' });
Film.belongsToMany(Professional, { through: WorkedOn, foreignKey: 'film', otherKey: 'professional' });
