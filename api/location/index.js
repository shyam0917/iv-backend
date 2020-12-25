const locationRoutes = require('./location.routes');
const Country = require('./country.model');
const State = require('./state.model');
const City = require('./city.model');

// Re export
module.exports = {
  Country,
  State,
  City,
  locationRoutes,
};