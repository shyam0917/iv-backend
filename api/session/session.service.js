
var message = require('../../helpers/message');
var config = require('../../config');
var guards = require('../../helpers/guards');
const Sequelize = require('sequelize');

exports.createSession = async (data) => {

    const sessionData = {
        tutor_id: data.tutor_id,
        student_id: data.student_id,
        slot_id: data.slot_id,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        date: data.date,
        price: data.price,
        subjectId: data.subjectId,
        subSubjectId: data.subSubjectId,
        sessionStatus: data.sessionStatus,
        sessionName: data.tutor_id + '0' + Date.now() + '0' + data.student_id
    }

    const sessionInfo = await sqConn.Session.createSession(sessionData, data.userId);
    if (sessionInfo) {
        let slotData = {
            book_status: 'booked'
        }
        const slotInfo = await sqConn.TutorAvailability.updateSlot(slotData, data.slot_id);
        if (slotInfo) {
            return { success: true, data: sessionInfo, message: message.SESSION_CREATED_SUCCESULLY };
        } else {
            return { success: false, message: message.DEFAULTERR };
        }

    } else {
        return { success: false, message: message.DEFAULTERR };
    }
};

exports.bookSession = async (data) => {

    const sessionData = {
        session_id: data.session_id,
        startTime: data.startTime,
        endTime: data.endTime,
        date: data.date,
        day: data.day,
        bookingStatus: data.bookingStatus
    }

    const bookingInfo = await sqConn.SessionBooking.bookSession(sessionData);
    if (bookingInfo) {
        return { success: true, data: bookingInfo, message: message.DEFAULT };
    } else {
        return { success: false, message: message.DEFAULTERR };
    }
};

exports.updateSession = async (data) => {

    const sessionData = {
        startTime: data.startTime,
        endTime: data.endTime,
        date: data.date,
        sessionStatus: data.sessionStatus,
    }

    const sessionInfo = await sqConn.Session.updateSession(sessionData, data.sessionId);
    if (sessionInfo) {
        return { success: true, data: sessionInfo, message: message.SESSION_UPDATED_SUCCESULLY };
    }
};

