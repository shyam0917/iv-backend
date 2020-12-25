const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    var City = sequelize.define('cities',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cityName: {
        type: DataTypes.STRING
      },
      state_id: {
        type: DataTypes.INTEGER
      }
    },{
        timestamps:false
    });


    // Get City By StateId
    City.getCityBySId = (id = null) => {
        return City.findAll({
            where: {
                state_id: id
            },
        })
            .then((cityData) => {
                return cityData;
            })
            .catch((err) => {
                throw err;
            });
    };

        // Get City By Id
        City.getCityById = (id = null) => {
            return City.findOne({
                where: {
                    id: id
                },
            })
                .then((CityData) => {
                    return CityData;
                })
                .catch((err) => {
                    throw err;
                });
        };

    return City;

};

