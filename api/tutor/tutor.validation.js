const Joi = require('joi');
const { commonResponse } = require('../../helpers');

exports.updateTutor = (req, res, next) => {

  const schema = Joi.object({
    userId: Joi.number().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dob: Joi.date().required(),
    country: Joi.number().required(),
    state: Joi.number().required(),
    city: Joi.number().required(),
    mobileNo: Joi.number(),
    iyzicoId: Joi.string().required(),
    description: Joi.string().min(250).max(500),
    nativeLanguage: Joi.string().required(),
    otherLanguage: Joi.string(),
    education: Joi.array().required(),
    professionalDetails: Joi.array().required(),
    certificates: Joi.array(),
    awards: Joi.array(),
    subjectDetails: Joi.array(),
    timeZone: Joi.string().required(),
    availability: Joi.array().required(),
    // costperSession: Joi.number().required(),
    documentUpload: Joi.object(),
    step: Joi.number(),
    imageUrl: Joi.string(),
  });

  let data = schema.validate(req.body);

  if (data['error']) {
    commonResponse.joiError(res, data.error)
  } else {
    next()
  }
}

exports.addTutor = (req, res, next) => {

  const schema = Joi.object({
    userId: Joi.number().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dob: Joi.date().required(),
    country: Joi.number().required(),
    state: Joi.number().required(),
    city: Joi.number().required(),
    mobileNo: Joi.number(),
    iyzicoId: Joi.string().required(),
    description: Joi.string().min(250).max(500),
    nativeLanguage: Joi.string(),
    otherLanguage: Joi.string(),
    education: Joi.array(),
    professionalDetails: Joi.array(),
    certificates: Joi.array(),
    awards: Joi.array(),
    subjectDetails: Joi.array(),
    timeZone: Joi.string(),
    availability: Joi.array(),
    costperSession: Joi.number(),
    documentUpload: Joi.object(),
    imageUrl: Joi.string(),
    step: Joi.number()

  });

  let data = schema.validate(req.body);

  if (data['error']) {
    commonResponse.joiError(res, data.error)
  } else {
    next()
  }
}

exports.getTutorBySubject = (req, res, next) => {

  const schema = Joi.object({
    userId: Joi.number().required(),
    subjectName: Joi.string().required()
  });

  let data = schema.validate(req.body);

  if (data['error']) {
    commonResponse.joiError(res, data.error)
  } else {
    next()
  }
}

exports.removeImage = (req, res, next) => {

  const schema = Joi.object({
    userId: Joi.number().required(),
    columnName: Joi.string().required(),
    imageObject: Joi.object().required()
  });

  let data = schema.validate(req.body);

  if (data['error']) {
    commonResponse.joiError(res, data.error)
  } else {
    next()
  }
}