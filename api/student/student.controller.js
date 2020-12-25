const studentService = require('./student.service');
const config = require('../../config');
const { commonResponse, guards, message } = require('../../helpers');

exports.updateStudent = async (req, res) => {
	try {
		const student = await sqConn.Student.findStudentByUserId(req.body.userId);
		if (!student) {
			return commonResponse.failure(res, message.USER_NOT_FOUND);
		} else {
			const data = await studentService.updateStudent(req.body);
			if (data.success) {
				return commonResponse.success(res, data.data, data.message);
			}
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.getStudentById = async (req, res) => {
	try {
		if (req.params.id) {
			const data = await sqConn.Student.findStudentDetails(req.params.id);
			if (data) {
				return commonResponse.success(res, data, message.DEFAULT);
			}
			return commonResponse.success(res, [], message.DEFAULT);
		} else {
			const data = await sqConn.Student.findAllStudentDetails();
			if (data) {
				return commonResponse.success(res, data, message.DEFAULT);
			}
			return commonResponse.failure(res, message.DEFAULTERR);

		}
	} catch (error) {
		console.log("err",error);
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.addStudentDetails = async (req, res) => {
	try {
		const student = await sqConn.Student.findStudentByUserId(req.body.userId);
		if (!student) {
			return commonResponse.failure(res, message.USER_NOT_FOUND);
		}
		else {
			const data = await studentService.addStudent(req.body);
			if (data.success) {
				return commonResponse.success(res, data.data, data.message);
			}
		}
		return commonResponse.success(res, student);

	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};


exports.refundPay = async (req, res) => {
	try {
		// iyzipay.refund.create(req.body, function (err, result) {
		// 	if (err) {
		// 		return commonResponse.failure(res, err);
		// 	}
		// 	return commonResponse.success(res, result, message.DEFAULT);
		// });
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};


// exports.getStudentTutors = async (req, res) => {
// 	try {
// 		if (req.params.id) {
// 			const student = await sqConn.Student.findBasicDetails(req.params.id);
// 			if (!student.length>0) {
// 				return commonResponse.failure(res, message.USER_NOT_FOUND);
// 			} else {
// 				const data = await studentService.findStudentDetails(student,req.params.id);
// 				if (data.success) {
// 					return commonResponse.success(res, data.data, data.message);
// 				}
// 				return commonResponse.failure(res, data.message);
// 			}

// 		}else{
// 			const data = await studentService.findAllStudent();
// 			if (data.success) {
// 				return commonResponse.success(res, data.data, message.DEFAULT);
// 			}
// 			return commonResponse.failure(res, data.message);

// 		}
// 	} catch (error) {
// 		return commonResponse.sendUnexpected(res, error);
// 	}
// };


