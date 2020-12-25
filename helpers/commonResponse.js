const Sequelize = require('sequelize');
const MESSAGE = require('./message');

exports.success = (res, data={}, message = MESSAGE.DEFAULT, statusCode = 200) => {
	const resData = {
		success: true,
		message: message,
		statusCode: statusCode,
		data: data,
	};
	return res.status(statusCode).send(resData);
};

exports.notFound = (res, message, statusCode = 404) => {
	const resData = {
		success: false,
		statusCode: statusCode,
		message: message,
	};
	return res.status(statusCode).send(resData);
};

exports.sendUnexpected = (res, err, statusCode = 500) => {
	const resData = {
		success: false,
		statusCode: statusCode,
		message: MESSAGE.DEFAULT_INTERNAL_SERVER_ERROR,
		err: err,
	};
	return res.status(statusCode).send(resData);
};

exports.keyAlreadyExist = (res, err, message = '', statusCode = 409) => {
	const resData = {
		success: false,
		statusCode: statusCode,
		message: message,
		err: err,
	};
	return res.status(statusCode).send(resData);
};

exports.unAuthorized = (res, message= MESSAGE.UNAUTHORIZED, statusCode = 401) => {
	const resData = {
		success: false,
		statusCode: statusCode,
		message: message,
	};
	return res.status(statusCode).send(resData);
};

exports.failure = (res, message = MESSAGE.DEFAULTERR, statusCode = 400) => {
	let response = {
		success: false,
		statusCode: statusCode,
		message: message
	};
	return res.status(statusCode).send(response);
};

exports.joiError = (res, message = MESSAGE.DEFAULTERR, statusCode = 400) => {

	let error = message.details[0].message;

	let response = {
		success: false,
		statusCode: statusCode,
		message: error.replace(/['"]/g, '')
		
	};
	return res.status(statusCode).send(response);
};