const router = require('express').Router();
const controller = require('./admin.controller');
const { commonResponse, guards } = require('../../helpers');

router.post('/verifyTutor', controller.verifyTutor);

router.use(function(req, res, next) {
	if (!req.route) {
		return commonResponse.notFound(res, 'NOT_FOUND');
	}
});

module.exports = router;
