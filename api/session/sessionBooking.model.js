const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    var SessionBooking = sequelize.define('session_bookings',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            session_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            startTime: {
                type: DataTypes.STRING,
            },
            endTime: {
                type: DataTypes.STRING,
            },
            date: {
                type: DataTypes.DATEONLY
            },
            day: {
                type: DataTypes.FLOAT,
            },
            bookingStatus: {
                type: DataTypes.STRING,
                defaultValue: 'booked'
            },
            isActive: {
                type: DataTypes.ENUM,
                defaultValue: '1',
                values: ['0', '1']
            },
            createdAt: { type: DataTypes.DATE, defaultValue: new Date(), },
            updatedAt: { type: DataTypes.DATE, defaultValue: new Date() }
        }, {
        timestamps: true
    });


    // book Session
    SessionBooking.bookSession = (data = {}) => {
        return SessionBooking.create(data)
            .then((bookingData) => {
                return bookingData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // get booked Session by tutorId
    SessionBooking.getbookedSession = (data = {}) => {
        return SessionBooking.create(data)
            .then((bookingData) => {
                return bookingData;
            })
            .catch((err) => {
                throw err;
            });
    };
    return SessionBooking;
};

