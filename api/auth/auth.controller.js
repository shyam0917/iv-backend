const { userService } = require('../user');
var jwt = require('jsonwebtoken');
var guards = require('../../helpers/guards');
const { commonResponse, email, message } = require('../../helpers');
require('dotenv').config();

exports.signUp = async (req, res) => {
	try {
		const data = await userService.saveUser(req.body);
		let tokenDetails = guards.createVerifyToken(data.data);
		if (data.success) {
			let fullName = data.data.firstName + ' ' + data.data.lastName;
			let emailData = {
				to: req.body.email,
				subject: message.EMAIL_VERIFICATION,
				link: process.env.MAIL_REDIRECT_URL + tokenDetails.token,
				template: 'signUpVerify',
				name: fullName
			};
			const result = await email.sendMail(emailData);
			return commonResponse.success(res, {}, data.message,201);
		}
		return commonResponse.keyAlreadyExist(res, {}, message.EMAIL_ALREADY_EXISTS);
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.verifyUser = async (req, res) => {
	let token = req.params.code;
	try {
		const data = await userService.verifyUser(token);

		if (data.success) {
			return commonResponse.success(res, data.data, data.message);
		}
		return commonResponse.unAuthorized(res, data.message);
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.signIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await sqConn.User.findUserByEmail(email);
		if (!user) {
			return commonResponse.failure(res, message.INVALIDE_EMAIL_PASSWORD);
		}
		else {
			if (user.isVerified === '0') {
				return commonResponse.unAuthorized(res, message.EMAIL_NOT_VERIFIED);
			} else if (!userService.validPassword(password, user.password)) {
				return commonResponse.failure(res, message.INVALIDE_EMAIL_PASSWORD);
			} else {
				let tokenDetails = guards.createUserToken(user);
				let userDetails = {
					token: tokenDetails.token,
					id: user.id,
					role: user.role,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName
				}
				return commonResponse.success(res, userDetails, message.LOGIN_SUCCESSFULLY);
			}
		}

	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.forgotPassWord = async (req, res) => {
	try {
		const user = await sqConn.User.findUserByEmail(req.body.email);
		if (!user) {
			return commonResponse.failure(res, message.EMAIL_NOT_FOUND);
		} else {
			if (user.isActive === 0) {
				return commonResponse.failure(res, message.NOT_ACTIVE_USER);
			} else {
				let jwtToken =  guards.createVerifyToken(user);
				let emailData = {
					to: req.body.email,
					subject: message.RESET_PASSWORD,
					link: process.env.RESET_PASSWORD_URL + jwtToken.token,
					template: 'resetPassword'
				};
				await email.sendMail(emailData);
				return commonResponse.success(res, {}, message.RESET_PASSWORD_MAIL_SEND_SUCCESSFULLY);
			}
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.resetPassword = async (req, res) => {
	const { password } = req.body;

	try {
		let options = {
			tokenCode: req.params.code,
			password: password
		};
		const data = await userService.resetPassword(options);
		if (data.success) {
			return commonResponse.success(res, {}, data.message);
		}
		return commonResponse.notFound(res, data.message);
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.deactivateUser = async (req, res) => {

	if(req.params && req.params.id){
	try {
		const user = await sqConn.User.findUserById(req.params.id);
		if(!user){
			return commonResponse.success(res, {}, message.USER_NOT_FOUND);
		}else if(user.isActive == '0'){
			return commonResponse.success(res, {}, 'User Already Deactivated');
		}
		else{
			const data = await userService.deactivateUser(req.params.id);
			if (data.success) {
				return commonResponse.success(res, {}, data.message);
			}
			return commonResponse.notFound(res, data.message);
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
}else{
	return commonResponse.failure(res, 'UserID is required');
}
};