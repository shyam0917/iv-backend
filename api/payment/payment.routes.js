const router = require('express').Router();
const { commonResponse } = require('../../helpers');
const controller = require('./payment.controller');
const { guards } = require('../../helpers');
// const validation = require('./session.validation');


 router.post('/createPayment',guards.isAuthorized(['student']),controller.createPayment);
// router.post('/updateSession',guards.isAuthorized(['student']),validation.updateSession,controller.updateSession);
// // router.post('/bookSession',guards.isAuthorized(['student']),validation.bookSession,controller.bookSession);
// router.get('/getSessionsById/:id?',guards.isAuthorized(['student','tutor']),controller.getSessionById);
// router.get('/getStudentSessionsById/:id?',guards.isAuthorized(['student','tutor']),controller.getStudentSession);
// router.get('/getTutorSessionsById/:id?',guards.isAuthorized(['student','tutor']),controller.getTutorSession);

router.use(function (req, res, next) {
	if (!req.route) {
		return commonResponse.notFound(res, 'NOT_FOUND');
	}
});
module.exports = router;
