const Joi = require('joi');
const { commonResponse } = require('../../helpers');

exports.updateStudent = (req, res, next) => {
    const schema = Joi.object({
      userId: Joi.number().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      dob: Joi.date().required(),
      country: Joi.number().required(),
      state: Joi.number().required(),
      city: Joi.number().required(),
      class: Joi.string().required(),
      timeZone: Joi.string().required(),
      nativeLanguage: Joi.string().required(),
      // subjectDetails: Joi.array().required(),
      mobileNo: Joi.number(),
      subjects: Joi.string().required(),
      documentUpload: Joi.object(),
      step: Joi.number(),
      imageUrl: Joi.string()
    });
  
    let data = schema.validate(req.body);
  
    if (data['error']) {
      commonResponse.joiError(res,data.error)
    } else {
      next()
    }
  }


  exports.addStudent = (req, res, next) => {
    const schema = Joi.object({
      userId: Joi.number().required(),
      dob: Joi.date().required(),
      country: Joi.number().required(),
      state: Joi.number().required(),
      city: Joi.number().required(),
      class: Joi.string().required(),
      timeZone: Joi.string().required(),
      nativeLanguage: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      // subjectDetails: Joi.array(),
      mobileNo: Joi.number(),
      subjects: Joi.string(),
      documentUpload: Joi.object(),
      step: Joi.number(),
      imageUrl: Joi.string()
    });
  
    let data = schema.validate(req.body);
  
    if (data['error']) {
      commonResponse.joiError(res,data.error)
    } else {
      next()
    }
  }
