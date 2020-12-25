const adminService = require('./admin.service');
const { commonResponse, guards, message } = require('../../helpers');

exports.verifyTutor = async (req, res) => {
    if(req.body.tutorId){
	try {
		   const data = await adminService.verifyTutor(req.body.tutorId);
			if (data.success) {
				return commonResponse.success(res, data.data, data.message);
            }
            return commonResponse.failure(res, data.message);
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
    }
}else{
    return commonResponse.failure(res, 'tutorId is Required');
}
};
