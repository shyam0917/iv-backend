
var message = require('../../helpers/message');
var config = require('../../config');
var guards = require('../../helpers/guards');
const Sequelize = require('sequelize');

exports.verifyTutor = async (data) => {

    let updatedData ={
        isAdminVerified: '1'
    }

const verificationInfo = await sqConn.User.markVerified(updatedData,data);
if (verificationInfo) {
    return { success: true, data: verificationInfo, message: message.TUTOR_VERIFIED_SUCCESULLY };
}


};

