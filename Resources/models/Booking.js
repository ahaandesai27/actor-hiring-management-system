const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../../db/connectDB.js');
const Organization = require('./Organization.js');
const Location = require('./Location.js');

const Booking = db.define(
    'Booking',
    {
        latitude: {
            type: DataTypes.FLOAT(9,6),
            allowNull: false,
            primaryKey: true,
            references: {
                model: Location,
                key: 'latitude'
            }
        },
        longitude: {
            type: DataTypes.FLOAT(9,6),
            allowNull: false,
            primaryKey: true,
            references: {
                model: Location,
                key: 'longitude'
            }
        },
        org_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Organization,
                key: 'org_id'
            }
        },
        startbookingdate: {
            type: DataTypes.DATE
        },
        endbookingdate: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'bookings',
        timestamps: false
    }
);

// Define associations
Booking.belongsTo(Organization, { foreignKey: 'org_id'
                                ,  targetKey: 'org_id',
                                constraints: false 
                                });

Booking.belongsTo(Location, { 
    foreignKey: 'latitude',
    targetKey: 'latitude',
    constraints: false // This prevents Sequelize from trying to create constraints
});

Booking.belongsTo(Location, { 
    foreignKey: 'longitude',
    targetKey: 'longitude',
    constraints: false
});

module.exports = Booking;