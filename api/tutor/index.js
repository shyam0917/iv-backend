const tutorRoutes = require('./tutor.routes');
const Tutor = require('./tutor.model');
const TutorAvailability = require('./tutorAvailability.model');
const tutorValidation = require('./tutor.validation');
const tutorService = require('./tutor.service');

// Re export
module.exports = {
  Tutor,
  TutorAvailability,
  tutorRoutes,
  tutorValidation,
  tutorService,
};