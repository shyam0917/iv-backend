const router = require('express').Router();
const { commonResponse } = require('../../helpers');
const controller = require('./location.controller');
const { guards } = require('../../helpers');


router.get('/getCountries',controller.getCountries);
router.get('/getCountryById/:id?',controller.getCountryById);
router.get('/getStateByCId/:id?',controller.getStateByCId);
router.get('/getCityBySId/:id?',controller.getCityBySId);
// router.post('/getStates',controller.getStates);
// router.post('/getCities',controller.getCities);

router.use(function (req, res, next) {
	if (!req.route) {
		return commonResponse.notFound(res, 'NOT_FOUND');
	}
});
module.exports = router;
