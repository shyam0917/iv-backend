const Joi = require('joi');
const { commonResponse } = require('../../helpers');

exports.createSession = (req, res, next) => {

    const schema = Joi.object({
      userId: Joi.number().required(),
      tutor_id: Joi.number().required(),
      student_id: Joi.number().required(),
      slot_id: Joi.number().required(),
      day: Joi.number().required(), 
      startTime: Joi.string().required(),
      subjectId: Joi.number().required(),
      subSubjectId: Joi.number().required(),
      endTime: Joi.string().required(),
      date: Joi.string().required(),
      price: Joi.number().required(),
      sessionName: Joi.string(),
      sessionStatus: Joi.string().required()
    });
  
    let data = schema.validate(req.body);
  
    if (data['error']) {
      commonResponse.joiError(res,data.error)
    } else {
      next()
    }
  }


  exports.updateSession = (req, res, next) => {

    const schema = Joi.object({
      userId: Joi.number().required(),
      sessionId: Joi.number().required(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
      date: Joi.string().required(),
      slot_id: Joi.number().required(),
      day: Joi.number().required(), 
      sessionStatus: Joi.string().required()
    });
  
    let data = schema.validate(req.body);
  
    if (data['error']) {
      commonResponse.joiError(res,data.error)
    } else {
      next()
    }
  }

  exports.bookSession = (req, res, next) => {

    const schema = Joi.object({
      session_id: Joi.number().required(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
      date: Joi.string().required(),
      day: Joi.number().required(),
      bookingStatus: Joi.string().required()
    });
  
    let data = schema.validate(req.body);
  
    if (data['error']) {
      commonResponse.joiError(res,data.error)
    } else {
      next()
    }
  }