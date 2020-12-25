const reviewService = require('./reviews.service');
const { commonResponse, guards, message } = require('../../helpers');

exports.createReview = async (req, res) => {
	try {
		const userInfo = await sqConn.Student.findStudentByUserId(req.body.userId);
		if (userInfo) {
			const data = await reviewService.createReview(req.body, userInfo.id);
			if (data.success) {
				return commonResponse.success(res, data.data, data.message);
			}
			return commonResponse.failure(res, data.message);
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.updateReview = async (req, res) => {
	try {
		const sessionData = await sqConn.Review.findReviewBySessionId(req.body.session_id);
		if (!sessionData) {
			return commonResponse.failure(res, message.REVIEW_NOT_FOUND);
		} else {
			const data = await reviewService.updateReview(req.body,sessionData.student_id);
			if (data.success) {
				return commonResponse.success(res, data.data, data.message);
			}
			return commonResponse.failure(res, message.DEFAULTERR);
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.getTutorReviews = async (req, res) => {
	try {
		let params = {
			page: req.query.page ? parseInt(req.query.page) : 1,
			results: req.query.results ? parseInt(req.query.results) : 1,
		};
		if (req.params.id) {
			const data = await sqConn.Review.findTutorReviewsById(req.params.id,params);
			if (data) {
				return commonResponse.success(res, data, message.DEFAULT);
			}
			return commonResponse.success(res, [], message.DEFAULT);
		} else {
			const data = await sqConn.Review.findAllTutorReviews(params);
			if (data) {
				return commonResponse.success(res, data, message.DEFAULT);
			}
			return commonResponse.failure(res, message.DEFAULTERR);

		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};
