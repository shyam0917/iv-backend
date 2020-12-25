const userService = require('./user.service');
const { commonResponse, email, guards, message } = require('../../helpers');

exports.changePassword = async (req, res) => {
	const { oldPassword, newPassword, userId } = req.body;
	try {
		const user = await sqConn.User.findUserById(userId);
		if (!user) {
			return commonResponse.failure(res, message.USER_NOT_FOUND);
		} else if (!userService.validPassword(oldPassword, user.password)) {
			return commonResponse.failure(res, message.INVALIDE_OLD_PASSWORD)
		} else {
			let userData = {
				password: newPassword,
				userId: userId
			};
			const data = await userService.changePassword(userData);
			if (data.success) {
				return commonResponse.success(res, data.data, data.message);
			}
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.updateNotifySettings = async (req, res) => {
	try {
		const user = await sqConn.User.findUserById(req.body.userId);
		if (!user) {
			return commonResponse.failure(res, message.USER_NOT_FOUND);
		}
		const data = await userService.updateNotifySettings(req.body);
		if (data.success) {
			return commonResponse.success(res, data.data, data.message);
		}

	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};