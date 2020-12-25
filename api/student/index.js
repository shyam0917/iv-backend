const studentRoutes = require('./student.routes');
const Student = require('./student.model');
const studentValidation = require('./student.validation');
const studentService = require('./student.service');

// Re export
module.exports = {
  Student,
  studentRoutes,
  studentValidation,
  studentService,
};