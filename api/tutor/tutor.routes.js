const router = require('express').Router();
const { commonResponse } = require('../../helpers');
const controller = require('./tutor.controller');
const { guards, message } = require('../../helpers');
const validation = require('./tutor.validation');


router.post('/updateTutor',guards.isAuthorized(['tutor']),validation.updateTutor,controller.updateTutor);
router.post('/addTutorDetails',guards.isAuthorized(['tutor']),validation.addTutor,controller.addTutorDetails);
router.get('/getCountDetails/:id?', guards.isAuthorized(['tutor','student']),controller.getCountDetails);
router.post('/deleteImage',guards.isAuthorized(['tutor']),validation.removeImage,controller.imageHandler);
router.get('/getTutorDetails/:id?',guards.isAuthorized(['tutor','student']),controller.getTutorById);
router.get('/getTutorListing',controller.getTutorList);
router.get('/getTutorBySubject/:subjectName?',guards.isAuthorized(['tutor','student']),controller.getTutorBySubject);


router.use(function (req, res, next) {
	if (!req.route) {
		return commonResponse.notFound(res, message.NOT_FOUND);
	}
});
module.exports = router;
