const router = require('express').Router();
const { commonResponse } = require('../../helpers');
const controller = require('./student.controller');
const { guards } = require('../../helpers');
const validation = require('./student.validation');


router.post('/updateStudent',validation.updateStudent,guards.isAuthorized(['student']),controller.updateStudent);
router.get('/getStudentDetails/:id?',guards.isAuthorized(['tutor','student']),controller.getStudentById);
router.post('/addStudentDetails',guards.isAuthorized(['student']),validation.addStudent,controller.addStudentDetails);
// router.get('/getStudentTutors/:id?',guards.isAuthorized(['student']),controller.getTutorDetails);
// router.post('/refund-pay',controller.refundPay);
router.use(function (req, res, next) {
	if (!req.route) {
		return commonResponse.notFound(res, req.languageCode, 'NOT_FOUND');
	}
});
module.exports = router;
