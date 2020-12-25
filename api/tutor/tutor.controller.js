const tutorService = require('./tutor.service');
const { commonResponse, guards, message } = require('../../helpers');


exports.addTutorDetails = async (req, res) => {
	try {
		const tutor = await sqConn.Tutor.findTutorByUserId(req.body.userId);
		if (!tutor) {
			return commonResponse.failure(res, message.USER_NOT_FOUND);
		} else {
			const data = await tutorService.addTutor(req.body, tutor);
			if (data.success) {
				return commonResponse.success(res, data.data, data.message);
			}
			return commonResponse.failure(res, data.message);
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.updateTutor = async (req, res) => {
	try {
		const tutor = await sqConn.Tutor.findTutorByUserId(req.body.userId);
		if (!tutor) {
			return commonResponse.failure(res, message.USER_NOT_FOUND);
		} else {
			const data = await tutorService.updateTutor(req.body, tutor);
			if (data.success) {
				return commonResponse.success(res, data.data, data.message);
			}
			return commonResponse.failure(res, data.message);
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.getTutorById = async (req, res) => {
	try {
		if (req.params.id) {
			const data = await sqConn.Tutor.findTutorDetails(req.params.id);
			if (data) {
				return commonResponse.success(res, data, message.DEFAULT);
			}
			return commonResponse.success(res, [], message.DEFAULT);

		} else {
			const data = await tutorService.findAllTutor();
			if (data.success) {
				return commonResponse.success(res, data.data, message.DEFAULT);
			}
			return commonResponse.failure(res, data.message);

		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.getTutorList = async (req, res) => {
	let params = {
		page: req.query.page ? parseInt(req.query.page) : 1,
		results: req.query.results ? parseInt(req.query.results) : 10,
		sortField: req.query.sortField ? req.query.sortField : 'rating',
		sortOrder: req.query.sortOrder ? req.query.sortOrder : 'DESC',
		sub: req.query.sub ? req.query.sub : '',
		days: req.query.days ? req.query.days : '',
		st: req.query.st ? req.query.st : '',
		et: req.query.et ? req.query.et : '',
		cost: req.query.cost? req.query.cost : '',
		ctry: req.query.ctry? req.query.ctry : '',
		lang: req.query.lang? req.query.lang : '',
		filterValue: req.query.filterValue ? req.query.filterValue : '',
		searchValue: req.query.search ? req.query.search : '',
		slot: req.query.slot ? req.query.slot : ''
	};
	try {
		const data = await tutorService.getTutorList(params);
		if (data.success) {
			return commonResponse.success(res, data.data, message.DEFAULT);
		}
		return commonResponse.failure(res, data.message);


	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.getCountDetails = async (req, res) => {
	try {
		if (req.params.id) {
			const data = await sqConn.Tutor.getStudentCount(req.params.id);
			if (!data) {
				return commonResponse.failure(res, message.NOT_FOUND);
			}
			return commonResponse.success(res, data, message.DEFAULT);

		} else {
			const data = await tutorService.getAllStudentCount();
			if (data) {
				return commonResponse.success(res, data, message.DEFAULT);
			}
			return commonResponse.failure(res, message.DEFAULT);

		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

// '$employee.manager.id$'
// exports.getTutorSessionById = async (req, res) => {
// 	try {
// 		if (req.params.id) {
// 			const tutor = await sqConn.Tutor.findSessionDetails(req.params.id);
// 			if (!tutor.length > 0) {
// 				return commonResponse.failure(res, message.USER_NOT_FOUND);
// 			}
// 			return commonResponse.success(res, tutor, message.DEFAULT);

// 		} else {
// 			const data = await tutorService.findAllTutor();
// 			if (data.success) {
// 				return commonResponse.success(res, data.data, message.DEFAULT);
// 			}
// 			return commonResponse.failure(res, data.message);

// 		}
// 	} catch (error) {
// 		return commonResponse.sendUnexpected(res, error);
// 	}
// };


exports.getTutorBySubject = async (req, res) => {
	try {
		const tutor = await sqConn.Tutor.findTutorBySubject(req.params.subjectName);
		if (!tutor) {
			return commonResponse.failure(res, message.USER_NOT_FOUND);
		}
		return commonResponse.success(res, tutor);

	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}

};

exports.imageHandler = async (req, res) => {
	try {
		const tutor = await sqConn.Tutor.findTutorByUserId(req.body.userId);
		if (!tutor) {
			return commonResponse.failure(res, message.USER_NOT_FOUND);
		} else {
			const data = await tutorService.handleRemoveImage(req.body, tutor);
			if (data.success) {
				return commonResponse.success(res, data.data, data.message);
			}
			return commonResponse.failure(res, data.message);
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

