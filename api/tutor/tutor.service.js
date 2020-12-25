
var message = require('../../helpers/message');
var config = require('../../config');
var path = require('path');
const Buffer = require('buffer').Buffer;
var fs = require('fs');
var guards = require('../../helpers/guards');
const cryptoRandomString = require('crypto-random-string');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.updateTutor = async (data, tutor) => {
    let userId = data.userId;
    let tutorData = {
        dob: data.dob,
        country: data.country,
        state: data.state,
        city: data.city,
        iyzicoId: data.iyzicoId,
        user_id: data.userId,
        mobileNo: data.mobileNo,
        costperSession: data.costperSession,
        certificates: JSON.stringify(data.certificates),
        education: JSON.stringify(data.education),
        timeZone: data.timeZone,
        awards: JSON.stringify(data.awards),
        description: data.description,
        nativeLanguage: data.nativeLanguage,
        otherLanguage: data.otherLanguage,
        professionalDetails: JSON.stringify(data.professionalDetails),
        subjectDetails: data.subjectDetails,
        documentUpload: data.documentUpload,
        availability: data.availability,
    };

    if (data.imageUrl) {
        let buff = new Buffer(data.imageUrl.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        let imageName = Date.now() + cryptoRandomString({ length: 4, type: 'base64' }) + '.jpg';
        fs.writeFile(`public/images/${imageName}`, buff, function (err) {
            if (err) {
                return { success: false, message: message.DEFAULTERR };
            }
        });
        tutorData.imageUrl = guards.getImage(data.imageUrl);
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
        tutorData.documentUpload.imageUrl = guards.getImage(data.documentUpload.imageUrl);
        tutorData.documentUpload = JSON.stringify(tutorData.documentUpload);
    }

    if (data.certificates) {
        tutorData.certificates = [];
        for (let certificate of data.certificates) {
            let imageUrl = certificate.certificateUrl;
            let buff = new Buffer(imageUrl.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
            let imageName = Date.now() + cryptoRandomString({ length: 4, type: 'base64' }) + '.jpg';
            fs.writeFile(`public/images/${imageName}`, buff, function (err) {
                if (err) {
                    return { success: false, message: message.DEFAULTERR };
                }
            });
            certificate.certificateUrl = imageName;
            tutorData.certificates.push(certificate);
        }
        if (tutor.certificates) {
            tutor.certificates = JSON.parse(tutor.certificates);
            for (let i in tutorData.certificates) {
                var got = false;
                for (let j in tutor.certificates) {
                    if (tutorData.certificates[i].id == tutor.certificates[j].id) {
                        got = true;
                        tutor.certificates[j] = tutorData.certificates[i];
                    }
                }
                if (got == false) {
                    tutor.certificates.push(tutorData.certificates[i]);
                }
            }
            tutorData.certificates = tutor.certificates;
            tutorData.certificates = JSON.stringify(tutorData.certificates);
        }
    }

    if (data.awards) {
        tutorData.awards = [];
        for (let award of data.awards) {
            let imageUrl = award.awardUrl;
            let buff = new Buffer(imageUrl.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
            let imageName = Date.now() + cryptoRandomString({ length: 4, type: 'base64' }) + '.jpg';
            fs.writeFile(`public/images/${imageName}`, buff, function (err) {
                if (err) {
                    return { success: false, message: message.DEFAULTERR };
                }
            });
            award.awardUrl = imageName;
            tutorData.awards.push(award);
        }
        if (tutor.awards) {
            tutor.awards = JSON.parse(tutor.awards);
            for (let i in tutorData.awards) {
                var got = false;
                for (let j in tutor.awards) {
                    if (tutorData.awards[i].id == tutor.awards[j].id) {
                        got = true;
                        tutor.awards[j] = tutorData.awards[i];
                    }
                }
                if (got == false) {
                    tutor.awards.push(tutorData.awards[i]);
                }
            }
            tutorData.awards = JSON.stringify(tutor.awards);
        } else {
            tutorData.awards = JSON.stringify(tutorData.awards);
        }
    }

    let userData = {
        firstName: data.firstName,
        lastName: data.lastName
    }
    const userInfo = await sqConn.User.updateUser(userData, data.userId);
    if (userInfo) {
        const tutorInfo = await sqConn.Tutor.updateTutor(tutorData, data.userId);
        if (tutorInfo) {
            const dataDeleted = await sqConn.UserSubject.deleteSubjectList(userId);
            if (dataDeleted) {
                for (let subject of tutorData.subjectDetails) {
                    let data = {
                        user_Id: userId,
                        subjectId: subject.subjectId,
                        subSubjectId: subject.subSubjectId
                    }
                    const subjectInfo = await sqConn.UserSubject.createSubjectList(data, userId);
                    if (!subjectInfo) {
                        return { success: false, message: message.DEFAULTERR };
                    }
                }
                const availabilityDeleted = await sqConn.TutorAvailability.deleteAvailability(tutor.id);
                if (availabilityDeleted) {
                    for (let schedule of tutorData.availability) {
                        let scheduleData = {
                            tutor_Id: tutor.id,
                            day: schedule.day,
                            start_time: schedule.start_time,
                            end_time: schedule.end_time,
                            book_status: schedule.book_status
                        }
                        const dataAvailability = await sqConn.TutorAvailability.createTutorAvailability(scheduleData);
                        if (!dataAvailability) {
                            return { success: false, message: message.DEFAULTERR };
                        }
                    }
                    return { success: true, data: tutorInfo, message: message.TUTOR_UPDATE_SUCCESULLY };
                } else {
                    return { success: false, message: message.DEFAULTERR };
                }

            } else {
                return { success: false, message: message.DEFAULTERR };
            }
        }
    } else {
        return { success: false, message: message.DEFAULTERR };
    }
};


exports.addTutor = async (data, tutor) => {
    let userId = data.userId;
    let tutorData = {
        dob: data.dob,
        country: data.country,
        state: data.state,
        city: data.city,
        iyzicoId: data.iyzicoId,
        user_id: data.userId,
        mobileNo: data.mobileNo,
        costperSession: data.costperSession,
        certificates: JSON.stringify(data.certificates),
        education: JSON.stringify(data.education),
        timeZone: data.timeZone,
        awards: JSON.stringify(data.awards),
        description: data.description,
        nativeLanguage: data.nativeLanguage,
        otherLanguage: data.otherLanguage,
        professionalDetails: JSON.stringify(data.professionalDetails),
        subjectDetails: data.subjectDetails,
        documentUpload: data.documentUpload,
        availability: data.availability,
    };
    if (data.dob && !data.education) {
        tutorData.step = 1;
    }
    else if (data.dob && data.education && !data.subjectDetails) {
        tutorData.step = 2;
    }
    else if (data.dob && data.education && data.subjectDetails && !data.timeZone) {
        tutorData.step = 3;
    }
    else if (data.dob && data.subjectDetails && data.timeZone && !data.documentUpload) {
        tutorData.step = 4;
    }
    else {
        tutorData.step = 5;
    }
    if (data.imageUrl) {
        let buff = new Buffer(data.imageUrl.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        let imageName = Date.now() + cryptoRandomString({ length: 4, type: 'base64' }) + '.jpg';
        fs.writeFile(`public/images/${imageName}`, buff, function (err) {
            if (err) {
                return { success: false, message: message.DEFAULTERR };
            }
        });
        tutorData.imageUrl = imageName;
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
        tutorData.documentUpload.imageUrl = imageName;
        tutorData.documentUpload = JSON.stringify(tutorData.documentUpload);
    }

    if (data.certificates) {
        tutorData.certificates = [];
        for (let certificate of data.certificates) {
            let imageUrl = certificate.certificateUrl;
            let buff = new Buffer(imageUrl.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
            let imageName = Date.now() + cryptoRandomString({ length: 4, type: 'base64' }) + '.jpg';
            fs.writeFile(`public/images/${imageName}`, buff, function (err) {
                if (err) {
                    return { success: false, message: message.DEFAULTERR };
                }
            });
            certificate.certificateUrl = imageName;
            tutorData.certificates.push(certificate);

        }
        if (tutor.certificates) {
            tutor.certificates = JSON.parse(tutor.certificates);
            for (let i in tutorData.certificates) {
                var got = false;
                for (let j in tutor.certificates) {
                    if (tutorData.certificates[i].id == tutor.certificates[j].id) {
                        got = true;
                        tutor.certificates[j] = tutorData.certificates[i];
                    }
                }
                if (got == false) {
                    tutor.certificates.push(tutorData.certificates[i]);
                }
            }
            tutorData.certificates = JSON.stringify(tutor.certificates);
        } else {
            tutorData.certificates = JSON.stringify(tutorData.certificates);
        }
    }

    if (data.awards) {
        tutorData.awards = [];
        for (let award of data.awards) {
            let imageUrl = award.awardUrl;
            let buff = new Buffer(imageUrl.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
            let imageName = Date.now() + cryptoRandomString({ length: 4, type: 'base64' }) + '.jpg';
            fs.writeFile(`public/images/${imageName}`, buff, function (err) {
                if (err) {
                    return { success: false, message: message.DEFAULTERR };
                }
            });
            award.awardUrl = imageName;
            tutorData.awards.push(award);
        }
        if (tutor.awards) {
            tutor.awards = JSON.parse(tutor.awards);
            for (let i in tutorData.awards) {
                var got = false;
                for (let j in tutor.awards) {
                    if (tutorData.awards[i].id == tutor.awards[j].id) {
                        got = true;
                        tutor.awards[j] = tutorData.awards[i];
                    }
                }
                if (got == false) {
                    tutor.awards.push(tutorData.awards[i]);
                }
            }
            tutorData.awards = JSON.stringify(tutor.awards);
        } else {
            tutorData.awards = JSON.stringify(tutorData.awards);
        }
    }

    let userData = {
        firstName: data.firstName,
        lastName: data.lastName
    }
    const userInfo = await sqConn.User.updateUser(userData, data.userId);
    if (userInfo) {
        const tutorInfo = await sqConn.Tutor.updateTutor(tutorData, data.userId);
        if (tutorInfo) {
            if (tutorData.step === 3) {
                for (let subject of tutorData.subjectDetails) {
                    let data = {
                        user_Id: userId,
                        subjectId: subject.subjectId,
                        subSubjectId: subject.subSubjectId
                    }
                    const subjectInfo = await sqConn.UserSubject.createSubjectList(data);
                    if (!subjectInfo) {
                        return { success: false, message: message.DEFAULTERR };
                    }
                }
                return { success: true, data: tutorInfo, message: message.TUTOR_UPDATE_SUCCESULLY };
            } else if (tutorData.step === 4) {
                const dataDeleted = await sqConn.UserSubject.deleteSubjectList(userId);
                if (dataDeleted) {
                    for (let subject of tutorData.subjectDetails) {
                        let data = {
                            user_Id: userId,
                            subjectId: subject.subjectId,
                            subSubjectId: subject.subSubjectId
                        }
                        const subjectInfo = await sqConn.UserSubject.createSubjectList(data, userId);
                        if (!subjectInfo) {
                            return { success: false, message: message.DEFAULTERR };
                        }
                    }
                    for (let schedule of tutorData.availability) {
                        let scheduleData = {
                            tutor_Id: tutor.id,
                            day: schedule.day,
                            start_time: schedule.start_time,
                            end_time: schedule.end_time,
                            book_status: schedule.book_status
                        }
                        const dataAvailability = await sqConn.TutorAvailability.createTutorAvailability(scheduleData);
                        if (!dataAvailability) {
                            return { success: false, message: message.DEFAULTERR };
                        }
                    }
                    return { success: true, data: tutorInfo, message: message.TUTOR_UPDATE_SUCCESULLY };
                } else {
                    return { success: false, message: message.DEFAULTERR };
                }
            } else if (tutorData.step === 5) {
                const dataDeleted = await sqConn.UserSubject.deleteSubjectList(userId);
                if (dataDeleted) {
                    for (let subject of tutorData.subjectDetails) {
                        let data = {
                            user_Id: userId,
                            subjectId: subject.subjectId,
                            subSubjectId: subject.subSubjectId
                        }
                        const subjectInfo = await sqConn.UserSubject.createSubjectList(data, userId);
                        if (!subjectInfo) {
                            return { success: false, message: message.DEFAULTERR };
                        }
                    }
                    const availabilityDeleted = await sqConn.TutorAvailability.deleteAvailability(tutor.id);
                    if (availabilityDeleted) {
                        for (let schedule of tutorData.availability) {
                            let scheduleData = {
                                tutor_Id: tutor.id,
                                day: schedule.day,
                                time: JSON.stringify(schedule.time),
                            }
                            const dataAvailability = await sqConn.TutorAvailability.createTutorAvailability(scheduleData);
                            if (!dataAvailability) {
                                return { success: false, message: message.DEFAULTERR };
                            }
                        }
                        return { success: true, data: tutorInfo, message: message.TUTOR_UPDATE_SUCCESULLY };
                    } else {
                        return { success: false, message: message.DEFAULTERR };
                    }

                } else {
                    return { success: false, message: message.DEFAULTERR };
                }
            } else {
                return { success: true, data: tutorInfo, message: message.TUTOR_UPDATE_SUCCESULLY };
            }

        }
    } else {
        return { success: false, message: message.DEFAULTERR };
    }

};

exports.handleRemoveImage = async (data, tutor) => {
    let tutorData = {
        columnName: data.columnName,
        imageObject: data.imageObject,
    };


    let imageArray = tutor[`${tutorData.columnName}`];
    tutorData.modifiedArray = imageArray.filter(item => {
        return item.id !== tutorData.imageObject.id
    })
    let deletedImage = tutorData.imageObject.imageUrl;
    let fileNameWithPath = `public/images/${deletedImage}`

    if (fs.existsSync(fileNameWithPath)) {
        fs.unlink(fileNameWithPath, (err) => {
            return { success: false, message: message.DEFAULTERR };
        });
    } else {
        return { success: false, message: 'Image Not Found' };
    }
    const deletedInfo = await sqConn.Tutor.deleteTutorFile(tutorData.columnName, data.userId);
    if (deletedInfo) {
        let tutorObj = {
            column: tutorData.columnName,
            columnData: JSON.stringify(tutorData.modifiedArray)
        }
        const tutorInfo = await sqConn.Tutor.updateTutorFile(tutorObj, data.userId);
        if (tutorInfo) {
            return { success: true, data: tutorInfo, message: message.TUTOR_UPDATE_SUCCESULLY }
        } else {
            return { success: false, message: message.DEFAULTERR };
        }
    }
}


exports.findAllTutor = async () => {
    const basicInfo = await sqConn.Tutor.findAllTutor();
    if (basicInfo) {
        return { success: true, data: basicInfo, message: message.DEFAULT };
    } else {
        return { success: false, message: message.DEFAULTERR };
    }

}

exports.getTutorList = async (params) => {
    let searchByAnd = [];
    if (params.ctry) {
        searchByAnd.push({ '$countryDetails.countryName$': params.ctry })
    }
    if (params.lang) {
        searchByAnd.push({ 'nativeLanguage': params.lang })
    }
    if (params.cost) {
        let x = params.cost.split(",");
        searchByAnd.push({ costperSession: { [Op.between]: [parseInt(x[0]), parseInt(x[1])] } })
    }
    if (params.days) {
        let dayArr = params.days.split(",").map(i => {
            return parseInt(i)
        })
        searchByAnd.push({ '$tutorAvailability.day$': { [Op.between]: dayArr } })
    }
    if (params.subject) {
        let dayArr = params.days.split(",").map(i => {
            return parseInt(i)
        })
        searchByAnd.push({ '$tutorAvailability.day$': { [Op.between]: dayArr } })
    }
    // if(params.st){
    //        searchByOr.push({'$tutorAvailability.start_time$' : {[Op.gte]: params.st} })
    //    }
    //    if(params.et){
    //     searchByOr.push({'$tutorAvailability.end_time$' : {[Op.lte]: params.et} })
    // }

    const listInfo = await sqConn.Tutor.findTutorList(params, searchByAnd);
    console.log("li",listInfo);
    if (listInfo) {
        return { success: true, data: listInfo, message: message.DEFAULT };
    } else {
        return { success: false, message: message.DEFAULTERR };
    }

}




