const subjectService = require('./subject.service');
const { commonResponse, guards, message } = require('../../helpers');

exports.createSubject = async (req, res) => {
    const subjectName = req.body.subjectName;
    if(subjectName){
	try {
		const subject = await sqConn.Subject.saveSubject(req.body.userId);
		if (!subject) {
			return commonResponse.failure(res,message.USER_NOT_FOUND);
		}  else {
            return commonResponse.success(res, {}, data.message);
			}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
    }
}else{
    return commonResponse.failure(res, "Subject name is required");
}
};

exports.getSubjectsByName = async (req, res) => {
		try {
			const subject = await sqConn.Subject.findSubjectByName(req.params.name);
			if (subject) {
				return commonResponse.success(res, subject, message.DEFAULT);
			} 
		} catch (error) {
			return commonResponse.sendUnexpected(res, error);
	}
};

exports.getSubjectListByName = async (req, res) => {
	try {
		const subject = await sqConn.Subject.findSubjectListWithCount(req.params.name);
		if (subject) {
			return commonResponse.success(res, subject, message.DEFAULT);
		} 
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
}
};

exports.getSubjectListByName = async (req, res) => {
	try {
		if (req.params.name) {
				const data = await sqConn.Subject.findSubjectWithCount(req.params.name);
				if (data) {
					return commonResponse.success(res, data, message.DEFAULT);
				}
				return commonResponse.success(res, [], message.DEFAULT);
		}else{
			const data = await sqConn.Subject.findSubjectListWithCount();
			if (data) {
				return commonResponse.success(res, data, message.DEFAULT);
			}
			return commonResponse.subject(res, [], message.DEFAULTERR);
		
		}
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};
