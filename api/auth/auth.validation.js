
const Joi = require('joi');
const { commonResponse } = require('../../helpers');

exports.signUp = (req, res, next) => {

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
    lessonReminder: Joi.string(),
    generalReminder: Joi.string(),
    role: Joi.string().max(15).required()
  });

  let data = schema.validate(req.body);

  if (data['error']) {
    commonResponse.joiError(res, data.error)
  } else {
    next()
  }
}

exports.signIn = (req, res, next) => {

  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
  });
  let data = schema.validate(req.body);

  if (data['error']) {
    commonResponse.joiError(res, data.error)
  } else {
    next()
  }
}