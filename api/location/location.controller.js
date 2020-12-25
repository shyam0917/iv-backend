
const { commonResponse, guards, message } = require('../../helpers');

exports.getCountries = async (req, res) => {
    try {
        const data = await sqConn.Country.getAllCountries();
        if (data) {
            return commonResponse.success(res, data, message.DEFAULT);
        }
        return commonResponse.failure(res, message.DEFAULTERR);
    } catch (error) {
        return commonResponse.sendUnexpected(res, error);
    }
};

exports.getCountryById = async (req, res) => {
    if(req.params.id>=0){
    try {
        const data = await sqConn.Country.getCountryById(req.params.id);
        if (!data) {
            return commonResponse.failure(res, message.NOT_FOUND);
        }
        return commonResponse.success(res, data, message.DEFAULT);
    } catch (error) {
        return commonResponse.sendUnexpected(res, error);
    }
}else{
    return commonResponse.failure(res, 'Country Id is required');
}
};

exports.getStates = async (req, res) => {
    if(req.body.countryId>=0){
    try {
        const data = await sqConn.State.getStatesByCountryId(req.body.countryId);
        if (data) {
            return commonResponse.success(res, data, message.DEFAULT);
        }
        return commonResponse.failure(res, message.DEFAULTERR);
    } catch (error) {
        return commonResponse.sendUnexpected(res, error);
    }
}else{
    return commonResponse.failure(res, 'Country Id is required');
}
};

// exports.getStateById = async (req, res) => {
//     if(req.params.id>=0){
//     try {
//         const data = await sqConn.State.getStateById(req.params.id);
//         if (data) {
//             return commonResponse.success(res, data, message.DEFAULT);
//         }
//         return commonResponse.failure(res, message.DEFAULTERR);
//     } catch (error) {
//         return commonResponse.sendUnexpected(res, error);
//     }
// }else{
//     return commonResponse.failure(res, 'State Id is required');
// }
// };

exports.getStateByCId = async (req, res) => {
	try {
		if (req.params.id) {
				const data = await sqConn.State.getStateByCId(req.params.id);
				if (data) {
					return commonResponse.success(res, data, message.DEFAULT);
				}
                return commonResponse.success(res, [], message.DEFAULT);
            }else{
                return commonResponse.failure(res, 'Country Id is required');  
            }
		// }else{
		// 	const data = await sqConn.Subject.findSubjectListWithCount();
		// 	if (data) {
		// 		return commonResponse.success(res, data, message.DEFAULT);
		// 	}
		// 	return commonResponse.subject(res, [], message.DEFAULTERR);
		
		// }
	} catch (error) {
		return commonResponse.sendUnexpected(res, error);
	}
};


// exports.getCities = async (req, res) => {
//     if(req.body.stateId>=0){
//     try {
//         const data = await sqConn.City.getCitiesByStateId(req.body.stateId);
//         if (data) {
//             return commonResponse.success(res, data, message.DEFAULT);
//         }
//         return commonResponse.failure(res, message.DEFAULTERR);
//     } catch (error) {
//         return commonResponse.sendUnexpected(res, error);
//     }
// }else{
//     return commonResponse.failure(res, 'State Id is required');
// }
// };

exports.getCityBySId = async (req, res) => {
    if(req.params.id>=0){
    try {
        const data = await sqConn.City.getCityBySId(req.params.id);
        if (data) {
            return commonResponse.success(res, data, message.DEFAULT);
        }
        return commonResponse.failure(res, message.DEFAULTERR);
    } catch (error) {
        return commonResponse.sendUnexpected(res, error);
    }
}else{
    return commonResponse.failure(res, 'State Id is required');
}
};