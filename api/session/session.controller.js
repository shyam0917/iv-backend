const sessionService = require('./session.service');
const { commonResponse, guards, message } = require('../../helpers');

exports.createSession = async (req, res) => {
	try {
		const data = await sessionService.createSession(req.body);
		if (data.success) {
			return commonResponse.success(res, data.data, data.message);
		}
		return commonResponse.failure(res, data.message);
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.bookSession = async (req, res) => {
	try {
		const sessionData = await sqConn.Session.findSessionById(req.body.session_id);
		if (sessionData) {
			const data = await sessionService.bookSession(req.body);
			if (data.success) {
				return commonResponse.success(res, data.data, data.message);
			}
			return commonResponse.failure(res, data.message);
		}else{
			return commonResponse.failure(res, message.NOT_FOUND);
		}

	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.updateSession = async (req, res) => {
	try {
		const session = await sqConn.Session.findSessionById(req.body.sessionId);
		if (!session) {
			return commonResponse.failure(res, message.SESSION_NOT_FOUND);
		} else {
			const data = await sessionService.updateSession(req.body);
			if (data.success) {
				return commonResponse.success(res, data.data, data.message);
			}
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.getSessionById = async (req, res) => {
	try {
		if (req.params.id) {
			const session = await sqConn.Session.findSessionById(req.params.id);
			if (!session) {
				return commonResponse.failure(res, message.SESSION_NOT_FOUND);
			}
			return commonResponse.success(res, session, message.DEFAULT);
		} else {
			const session = await sqConn.Session.findAllSession();
			if (!session) {
				return commonResponse.failure(res, message.SESSION_NOT_FOUND);
			}
			return commonResponse.success(res, session, message.DEFAULT);
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.getStudentSession = async (req, res) => {
	try {
		if (req.params.id) {
			const session = await sqConn.Session.findSessionByStudentId(req.params.id);
			if (!session) {
				return commonResponse.failure(res, message.SESSION_NOT_FOUND);
			}
			return commonResponse.success(res, session, message.DEFAULT);
		} else {
			const session = await sqConn.Session.findAllStudentSession();
			if (!session) {
				return commonResponse.failure(res, message.SESSION_NOT_FOUND);
			}
			return commonResponse.success(res, session, message.DEFAULT);
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.getTutorSession = async (req, res) => {
	try {
		if (req.params.id) {
			const session = await sqConn.Session.findSessionByTutorId(req.params.id);
			if (!session) {
				return commonResponse.failure(res, message.SESSION_NOT_FOUND);
			}
			return commonResponse.success(res, session, message.DEFAULT);
		}
		else {
			const session = await sqConn.Session.findAllTutorSession();
			if (!session) {
				return commonResponse.failure(res, message.SESSION_NOT_FOUND);
			}
			return commonResponse.success(res, session, message.DEFAULT);
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};

exports.getTutorBySession = async (req, res) => {
	try {
		if (req.params.id) {
			const session = await sqConn.Session.findTutorSessionById(req.params.id);
			if (!session) {
				return commonResponse.failure(res, message.SESSION_NOT_FOUND);
			}
			return commonResponse.success(res, session, message.DEFAULT);
		} else {
			const session = await sqConn.Session.findAllSession();
			if (!session) {
				return commonResponse.failure(res, message.SESSION_NOT_FOUND);
			}
			return commonResponse.success(res, session, message.DEFAULT);
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};