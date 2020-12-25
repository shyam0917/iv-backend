const Joi = require('joi');
const { commonResponse } = require('../../helpers');

exports.createReview = (req, res, next) => {

    const schema = Joi.object({
      userId: Joi.number().required(),
      session_id: Joi.number().required(),
      tutor_id: Joi.number().required(),
      review: Joi.string().required(),
      rating: Joi.number().required(),
    });
  
    let data = schema.validate(req.body);
  
    if (data['error']) {
      commonResponse.joiError(res,data.error)
    } else {
      next()
    }
  }

  exports.updateReview = (req, res, next) => {

    const schema = Joi.object({
      userId: Joi.number().required(),
      session_id: Joi.number().required(),
      tutor_id: Joi.number().required(),
      review: Joi.string().required(),
      rating: Joi.number().required(),
    });
  
    let data = schema.validate(req.body);
  
    if (data['error']) {
      commonResponse.joiError(res,data.error)
    } else {
      next()
    }
  }