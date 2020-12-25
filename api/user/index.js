const userRoutes = require('./user.routes');
const User = require('./user.model');
const userValidation = require('./user.validation');
const userService = require('./user.service');

// Re export
module.exports = {
  User,
  userRoutes,
  userValidation,
  userService,
};