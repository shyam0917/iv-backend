
var message = require('../../helpers/message');
var config = require('../../config');
var guards = require('../../helpers/guards');
const Sequelize = require('sequelize');

exports.createReview = async (data,studentId) => {

    const reviewData = {
        session_id: data.session_id,
        tutor_id: data.tutor_id,
        student_id: studentId,
        review: data.review,
        status: data.status,
        rating: data.rating,
    }
    const sessionInfo = await sqConn.Review.findReviewBySessionId(data.session_id);
    if(sessionInfo){
        return { success: false, message: 'Review Already Exist' }
    }
    const sessionStatus = await sqConn.Session.findSessionById(data.session_id);
    if (sessionStatus && sessionStatus.sessionStatus === "completed") {
        const reviewInfo = await sqConn.Review.createReview(reviewData, data.userId);
        if (reviewInfo) {
            return { success: true, data: reviewInfo, message: message.REVIEW_ADDED_SUCCESULLY };
        }
    } else {
        return { success: false, message: 'Session Not completed Yet' }
    }

};

exports.updateReview = async (data,studentId) => {

    const reviewData = {
        session_id: data.session_id,
        tutor_id: data.tutor_id,
        student_id: studentId,
        review: data.review,
        status: data.status,
        rating: data.rating,
    }

    const reviewInfo = await sqConn.Review.updateReview(reviewData, data.session_id);
    if (reviewInfo) {
        return { success: true, data: reviewInfo, message: message.REVIEW_UPDATED_SUCCESULLY };
    }
    else {
        return { success: false, message: message.DEFAULTERR }
    }

};
