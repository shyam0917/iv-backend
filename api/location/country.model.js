const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    var Country = sequelize.define('countries',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sortName: {
        type: DataTypes.STRING
      },
      countryName: {
        type: DataTypes.STRING
      },
      phonecode: {
        type: DataTypes.INTEGER
      }},{
          timestamps:false
      }
);


    // Find Country By Id
    Country.getCountryById = (id = null) => {
        return Country.findOne({
            where: {
                id: id
            },
        })
            .then((countryData) => {
                return countryData;
            })
            .catch((err) => {
                throw err;
            });
    };


    // get all countries
    Country.getAllCountries = () => {
        return Country.findAll()
            .then((countryData) => {
                return countryData;
            })
            .catch((err) => {
                throw err;
            });
    };

    return Country;

};

