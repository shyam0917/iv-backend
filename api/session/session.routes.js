const router = require('express').Router();
const { commonResponse } = require('../../helpers');
const controller = require('./session.controller');
const { guards } = require('../../helpers');
const validation = require('./session.validation');


router.post('/createSession',guards.isAuthorized(['student']),validation.createSession,controller.createSession);
router.post('/updateSession',guards.isAuthorized(['student']),validation.updateSession,controller.updateSession);
// router.post('/bookSession',guards.isAuthorized(['student']),validation.bookSession,controller.bookSession);
router.get('/getSessionsById/:id?',guards.isAuthorized(['student','tutor']),controller.getSessionById);
router.get('/getStudentSessionsById/:id?',guards.isAuthorized(['student','tutor']),controller.getStudentSession);
router.get('/getTutorSessionsById/:id?',guards.isAuthorized(['student','tutor']),controller.getTutorSession);

router.use(function (req, res, next) {
	if (!req.route) {
		return commonResponse.notFound(res, 'NOT_FOUND');
	}
});
module.exports = router;
