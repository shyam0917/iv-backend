const subjectRoutes = require('./subject.routes');
const Subject = require('./subject.model');
const UserSubject = require('./userSubject.model');
const subjectService = require('./subject.service');

// Re export
module.exports = {
  Subject,
  UserSubject,
  subjectRoutes,
  subjectService,
};