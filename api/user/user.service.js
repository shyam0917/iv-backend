const bcrypt = require('bcryptjs');
var message = require('../../helpers/message');
var config = require('../../config');
var guards = require('../../helpers/guards');

// save user
exports.saveUser = async (data) => {
	const existUser = await sqConn.User.findUserByEmail(data.email);

	if (existUser) {
		return { success: false, message: message.EMAIL_ALREADY_EXISTS, data: existUser };
	}
	if (data && data['password']) {
		data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(5));
	}
	const userInfo = await sqConn.User.createUser(data);
	if (userInfo) {
		if (data.role === "student") {
			let studentData = {
				user_id: userInfo.id,
				step:0
			}
			const studentInfo = await sqConn.Student.createStudent(studentData);
			if (studentInfo) {
				return { success: true, data: userInfo, message: message.USER_SIGNUP };
			}
		} else if (data.role === "tutor") {
			let tutorData = {
				user_id: userInfo.id,
				step: 0
			}
			const tutorInfo = await sqConn.Tutor.createTutor(tutorData);
			if (tutorInfo) {
				return { success: true, data: userInfo, message: message.USER_SIGNUP };
			}
		}

	}

};

// verify user
exports.verifyUser = async (token) => {
	let tokenStatus = guards.verifyJWT(token);
	if (tokenStatus.key === 1) {
		const user = await sqConn.User.findUserById(tokenStatus.payload.id);
		if (!user) {
			return { success: false, message: message.INVALIDE_ACTIVATION_CODE };
		} else if (user.isVerified == '1') {
			return { success: false, message: message.TOKEN_EXPIRED };
		}else{
		let userData = {
			isVerified: '1',
			isActive: '1'
		};
		const userInfo = await sqConn.User.VerifyUser(userData, tokenStatus.payload.id);
		if (userInfo) {
			let tokenData = {
				id: user.id,
				role: user.role
			}
			let tokenDetails = guards.createUserToken(tokenData);
			let userDetails = {
				token: tokenDetails.token,
				id: user.id,
				role: user.role,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName
			}
			return { success: true, data: userDetails, message: message.USER_VERIFIED_SUCCESULLY };
		}
	}

	} else {
		return { success: false, message: message.INVALIDE_ACTIVATION_CODE };
	}
};

exports.validPassword = (password, passwordHash) => bcrypt.compareSync(password, passwordHash);

// reset user password
exports.resetPassword = async (data) => {
	const keyStatus = guards.verifyJWT(data.tokenCode);

	if (keyStatus.key === 1) {
		let userData = {
			password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(5)),
			id: keyStatus.payload.id
		};
		const userInfo = await sqConn.User.updateUserPassword(userData);

		if (userInfo) {
			return { success: true, data: userInfo, message: message.RESET_PASSWORD_SUCCESULLY };
		}
	}
	else {
		return { success: false, message: message.INVALIDE_RESET_PASSWORD_CODE };
	}

};

//  change user password
exports.changePassword = async (data) => {
	let userData = {
		id: data.userId,
		password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(5))
	};

	const userInfo = await sqConn.User.updateUserPassword(userData);
	if (userInfo) {
		return { success: true, data: userInfo, message: message.CHANGE_PASSWORD_SUCCESULLY };
	}
};

// deactivate user
exports.deactivateUser = async (data) => {
	let userData = {
		isActive: '0',
	};
	const userInfo = await sqConn.User.deactivateUser(userData, data);
	if (userInfo) {
		return { success: true, data: userInfo, message: message.USER_DEACTIVATE_SUCCESULLY };
	}
};

// update notification settings
exports.updateNotifySettings = async (data) => {
	let notifyData = {
		lessonReminder: data.lessonReminder,
		generalReminder: data.generalReminder
	};

	const notifyInfo = await sqConn.User.updateUser(notifyData, data.userId);
	if (notifyInfo) {
		return { success: true, data: notifyInfo, message: message.DEFAULT };
	}
};