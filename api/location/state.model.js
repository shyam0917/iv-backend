const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    var State = sequelize.define('states',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      stateName: {
        type: DataTypes.STRING
      },
      country_id: {
        type: DataTypes.INTEGER
      }
    },{
        timestamps:false
    });


    // Get State By CountryId
    State.getStateByCId = (id = null) => {
        return State.findAll({
            where: {
                country_id: id
            },
        })
            .then((stateData) => {
                return stateData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // Get State By Id
    State.getStateById = (id = null) => {
        return State.findOne({
            where: {
                id: id
            },
        })
            .then((stateData) => {
                return stateData;
            })
            .catch((err) => {
                throw err;
            });
    };

    return State;

};

