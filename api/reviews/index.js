const reviewRoutes = require('./reviews.routes');
const Review = require('./reviews.model');
const reviewValidation = require('./reviews.validation');
const reviewService = require('./reviews.service');

// Re export
module.exports = {
  Review,
  reviewRoutes,
  reviewValidation,
  reviewService,
};