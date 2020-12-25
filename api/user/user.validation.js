const Joi = require('joi');
const { commonResponse } = require('../../helpers');

exports.changePassword = (req, res, next) => {

    const schema = Joi.object({
      userId: Joi.number().required(),
      oldPassword: Joi.string().min(6).required(),
      newPassword: Joi.string().min(6).required(),
      role: Joi.string().required()
    });
  
    let data = schema.validate(req.body);
  
    if (data['error']) {
      commonResponse.joiError(res,data.error)
    } else {
      next()
    }
  }

  exports.updateNotifySettings = (req, res, next) => {

    const schema = Joi.object({
      userId: Joi.number().required(),
      lessonReminder: Joi.string().required(),
      generalReminder: Joi.string().required(),
    });
  
    let data = schema.validate(req.body);
  
    if (data['error']) {
      commonResponse.joiError(res,data.error)
    } else {
      next()
    }
  }




  //moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');