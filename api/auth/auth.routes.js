const router = require('express').Router();
const controller = require('./auth.controller');
const userValidation = require('./auth.validation');
const { commonResponse, guards } = require('../../helpers');

router.post('/signup',userValidation.signUp, controller.signUp);
router.get('/verify/:code', controller.verifyUser);
router.post('/signin',userValidation.signIn, controller.signIn);
router.post('/forgot-password', controller.forgotPassWord);
router.post('/reset-password/:code', controller.resetPassword);
router.post('/deactivateUser/:id',guards.isAuthorized(['student','tutor']),controller.deactivateUser);

router.use(function(req, res, next) {
	if (!req.route) {
		return commonResponse.notFound(res, 'NOT_FOUND');
	}
});

module.exports = router;
