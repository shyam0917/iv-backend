const router = require('express').Router();
const { commonResponse } = require('../../helpers');
const controller = require('./subject.controller');
const { guards } = require('../../helpers');

router.post('/createSubject',controller.createSubject);
router.get('/getSubjectListbyName/:name?',controller.getSubjectsByName);
router.get('/getSubjectListWithCount/:name?',controller.getSubjectListByName);

router.use(function (req, res, next) {
	if (!req.route) {
		return commonResponse.notFound(res, 'NOT_FOUND');
	}
});
module.exports = router;
