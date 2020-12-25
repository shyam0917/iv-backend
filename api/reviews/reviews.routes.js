const router = require('express').Router();
const { commonResponse } = require('../../helpers');
const controller = require('./reviews.controller');
const { guards } = require('../../helpers');
const validation = require('./reviews.validation');


router.post('/createReview',guards.isAuthorized(['student','tutor']),validation.createReview,controller.createReview);
router.post('/updateReview',guards.isAuthorized(['student']),validation.updateReview,controller.updateReview);
router.get('/getReviewByTutorId/:id?',guards.isAuthorized(['student','tutor']),controller.getTutorReviews);

router.use(function (req, res, next) {
	if (!req.route) {
		return commonResponse.notFound(res, 'NOT_FOUND');
	}
});
module.exports = router;
