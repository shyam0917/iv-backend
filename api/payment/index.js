const paymentRoutes = require('./payment.routes');
const Payment = require('./payment.model');
const paymentValidation = require('./payment.validation');
const paymentService = require('./payment.service');

// Re export
module.exports = {
  Payment,
  paymentRoutes,
  paymentValidation,
  paymentService,
};