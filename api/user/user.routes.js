const router = require('express').Router();
const { commonResponse } = require('../../helpers');
const controller = require('./user.controller');
const { guards,message } = require('../../helpers');
const validation = require('./user.validation');


router.post('/change-password',guards.isAuthorized(['student','tutor']),validation.changePassword,controller.changePassword);
router.post('/updateNotifySettings',guards.isAuthorized(['student','tutor']),validation.updateNotifySettings,controller.updateNotifySettings);


router.use(function (req, res, next) {
	if (!req.route) {
		return commonResponse.notFound(res, message.NOT_FOUND);
	}
});
module.exports = router;

// SELECT * FROM database_development.tutors,database_development.users WHERE tutors.user_id = users.id