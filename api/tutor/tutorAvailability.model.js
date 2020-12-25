const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  var TutorAvailability = sequelize.define('tutor_availability',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tutor_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      day: {
        type: DataTypes.INTEGER
      },
      start_time: {
        type: DataTypes.TIME
      },
      end_time: {
        type: DataTypes.TIME
      },
      book_status: {
        type: DataTypes.ENUM,
        defaultValue: 'available',
        values: ['available', 'unavailable', 'booked']
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

  // create Tutor Availability
  TutorAvailability.createTutorAvailability = (data = {}) => {
    return TutorAvailability.create(data)
      .then((tutorData) => {
        return tutorData;
      })
      .catch((err) => {
        throw err;
      });
  };

  // remove Tutor Availability
  TutorAvailability.deleteAvailability = (id = null) => {
    let condition = {
      where: {
        tutor_Id: id
      },
    };
    return TutorAvailability.destroy(condition)
      .then((tutorData) => {
        return tutorData;
      })
      .catch((err) => {
        throw err;
      });
  };

  // update tutor slot
  TutorAvailability.updateSlot = (data = {}, id = null) => {
    let condition = {
      where: {
        id: id
      }
    };

    return TutorAvailability.update(data, condition)
      .then((tutorData) => {
        return tutorData;
      })
      .catch((err) => {
        throw err;
      });
  };


  return TutorAvailability;

};

