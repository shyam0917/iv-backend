const bcrypt = require('bcryptjs');
var message = require('../../helpers/message');
var config = require('../../config');
var fs = require('fs');
var path = require('path');
const Buffer = require('buffer').Buffer;
var guards = require('../../helpers/guards');
const cryptoRandomString = require('crypto-random-string');
const Sequelize = require('sequelize');

exports.updateStudent = async (data) => {
    let studentData = {
        dob: data.dob,
        country: data.country,
        state: data.state,
        city: data.city,
        class: data.class,
        timeZone: data.timeZone,
        mobileNo: data.mobileNo,
        nativeLanguage: data.nativeLanguage,
        documentUpload: data.documentUpload,
        subjects: data.subjects
        // updatedAt: Sequelize.DATE
    };
    if (data.imageUrl) {
        let buff = new Buffer(data.imageUrl.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        let imageName = Date.now() + cryptoRandomString({ length: 4, type: 'base64' }) + '.jpg';
        fs.writeFile(`public/images/${imageName}`, buff, function (err) {
            if (err) {
                return { success: false, message: message.DEFAULTERR };
            }
        });
        studentData.imageUrl = imageName;
    }
    if (data.documentUpload) {
        let imageUrl = data.documentUpload.imageUrl;
        let buff = new Buffer(imageUrl.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        let imageName = Date.now() + cryptoRandomString({ length: 4, type: 'base64' }) + '.jpg';
        fs.writeFile(`public/images/${imageName}`, buff, function (err) {
            if (err) {
                return { success: false, message: message.DEFAULTERR };
            }
        });
        studentData.documentUpload.imageUrl = imageName;
        studentData.documentUpload = JSON.stringify(studentData.documentUpload);
    }

    let userData = {
        firstName: data.firstName,
        lastName: data.lastName
    }

    const userInfo = await sqConn.User.updateUser(userData, data.userId);
    if (userInfo) {
        const studentInfo = await sqConn.Student.updateStudent(studentData, data.userId);
        if (studentInfo) {
            // const dataDeleted = await sqConn.UserSubject.deleteSubjectList(userId);
            // if (dataDeleted) {
            //     for (let subject of studentData.subjectDetails) {
            //         let data = {
            //             user_Id: userId,
            //             subjectId: subject.subjectId,
            //             subSubjectId: subject.subSubjectId
            //         }
            //         const subjectInfo = await sqConn.UserSubject.createSubjectList(data, userId);
            //         if (!subjectInfo) {
            //             return { success: false, message: message.DEFAULTERR };
            //         }
            //     }
            //     return { success: true, data: studentInfo, message: message.STUDENT_UPDATE_SUCCESULLY };
            // } else {
            //     return { success: false, message: message.DEFAULTERR };
            // }

            return { success: true, data: studentInfo, message: message.STUDENT_UPDATE_SUCCESULLY };
        } else {
            return { success: false, message: message.DEFAULTERR };
        }
    } else {
        return { success: false, message: message.DEFAULTERR };
    }

};

exports.addStudent = async (data) => {
    let userId = data.userId;
    let studentData = {
        dob: data.dob,
        country: data.country,
        state: data.state,
        city: data.city,
        class: data.class,
        timeZone: data.timeZone,
        mobileNo: data.mobileNo,
        nativeLanguage: data.nativeLanguage,
        documentUpload: data.documentUpload,
        subjects: data.subjects
        // updatedAt: Sequelize.DATE
    };

    if (data.dob && !data.subjects) {
        studentData.step = 1;
    }
    else if (data.dob && data.subjects && !data.documentUpload) {
        studentData.step = 2;
    }
    else {
        studentData.step = 3;
    }



    if (data.imageUrl) {
        var buff = new Buffer(data.imageUrl.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        let imageName = Date.now() + cryptoRandomString({ length: 4, type: 'base64' }) + '.jpg';
        fs.writeFile(`public/images/${imageName}`, buff, function (err) {
            if (err) {
                return { success: false, message: message.DEFAULTERR };
            }
        });
        studentData.imageUrl = imageName;
    }

    if (data.documentUpload) {
        let imageUrl = data.documentUpload.imageUrl;
        let buff = new Buffer(imageUrl.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        let imageName = Date.now() + cryptoRandomString({ length: 4, type: 'base64' }) + '.jpg';
        fs.writeFile(`public/images/${imageName}`, buff, function (err) {
            if (err) {
                return { success: false, message: message.DEFAULTERR };
            }
        });
        studentData.documentUpload.imageUrl = imageName;
        studentData.documentUpload = JSON.stringify(studentData.documentUpload);
    }

    let userData = {
        firstName: data.firstName,
        lastName: data.lastName
    }

    const userInfo = await sqConn.User.updateUser(userData, data.userId)
    if (userInfo) {
        const studentInfo = await sqConn.Student.updateStudent(studentData, data.userId);
        if (studentInfo) {
            return { success: true, data: studentInfo, message: message.STUDENT_UPDATE_SUCCESULLY };
        } else {
            return { success: false, message: message.DEFAULTERR };
        }

    } else {
        return { success: false, message: message.DEFAULTERR };
    }
}


// exports.findStudentDetails = async (studentDetails,userId)=>{
//     const subjectInfo = await sqConn.Student.findSubjectDetails(userId);
//     if(subjectInfo){
//         let studentInfo = {
//             studentDetails: studentDetails,
//             subjectDetails: subjectInfo
//         }
//         return { success: true, data: studentInfo, message: message.DEFAULT };
//     }else{
//         return { success: false, message: message.DEFAULTERR };
//     }
// }

exports.findAllStudent = async () => {
    const basicInfo = await sqConn.Student.findAllBasicDetails();
    if (basicInfo) {
        const subjectInfo = await sqConn.Student.findAllSubjectDetails();
        if (subjectInfo) {
            let studentInfo = {
                studentDetails: basicInfo,
                subjectDetails: subjectInfo
            }
            return { success: true, data: studentInfo, message: message.DEFAULT };
        } else {
            return { success: false, message: message.DEFAULTERR };
        }
    }

}

// exports.verifyUser = async (token) => {
// 	var uId = null;
// 	jwt.verify(token, config.jwt.secretKey, (err, decoded) => {
// 		if (err) {
// 			return { success: false, message: message.INVALIDE_ACTIVATION_CODE };
// 		}
// 		uId = decoded.data
// 	});
// 	if(uId){
// 	const user = await sqConn.User.findUserById(uId);
// 	if (!user) {
// 		return { success: false, message: message.INVALIDE_ACTIVATION_CODE };
// 	}
// 	let userData = {
// 		isVerified: '1',
// 		isActive: '1'
// 	};
// 	const userInfo = await sqConn.User.VerifyUser(userData,uId);

// 	if (userInfo) {
// 		return { success: true, data: user, message: message.USER_ACTIVATE_SUCCESULLY };
// 	}

// }else{
// 	return { success: false, message: message.INVALIDE_ACTIVATION_CODE };
// }


// };

exports.validPassword = (password, passwordHash) => bcrypt.compareSync(password, passwordHash);


