const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    var Student = require('../student/student.model')(sequelize, Sequelize.DataTypes);
    var Tutor = require('../tutor/tutor.model')(sequelize, Sequelize.DataTypes);
    var User = require('../user/user.model')(sequelize, Sequelize.DataTypes);
    var Session = sequelize.define('sessions',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            tutor_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            student_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            slot_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            day: {
                type: DataTypes.INTEGER,
            },
            startTime: {
                type: DataTypes.STRING,
            },
            endTime: {
                type: DataTypes.STRING,
            },
            date: {
                type: DataTypes.DATEONLY
            },
            price: {
                type: DataTypes.FLOAT,
            },
            endTime: {
                type: DataTypes.STRING,
            },
            subjectId: {
                type: DataTypes.INTEGER
            },
            subSubjectId: {
                type: DataTypes.INTEGER
            },
            sessionName: {
                type: DataTypes.STRING,
            },
            sessionStatus: {
                type: DataTypes.ENUM,
                defaultValue: 'upcoming',
                values: ['upcoming', 'completed', 'cancelled']
            },
            isActive: {
                type: DataTypes.ENUM,
                defaultValue: '1',
                values: ['0', '1']
            },
            createdAt: { type: DataTypes.DATE, defaultValue: new Date(), },
            updatedAt: { type: DataTypes.DATE, defaultValue: new Date() }
        }, {
        timestamps: true
    });

    // create Session
    Session.createSession = (data = {}) => {
        return Session.create(data)
            .then((sessionData) => {
                return sessionData;
            })
            .catch((err) => {
                throw err;
            });
    };


    // Find Session By Id
    Session.findSessionById = (id = null) => {
        return Session.findOne({
            where: {
                id: id,
                isActive: '1'
            },
        })
            .then((sessionData) => {
                return sessionData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // find session By Student Id
    Session.findSessionByStudentId = async (id = null) => {
        let conditions = {
            include: [
                {
                    model: sqConn.Student
                }, {
                    model: sqConn.Tutor,
                    include: [
                        {
                            model: sqConn.User,
                            attributes: ['firstName', 'id', 'lastName'],
                        }, {
                            model: sqConn.Country,
                            as: 'countryDetails',
                            attributes: ['countryName']
                        }
                    ]
                }
            ]
        }
        conditions['where'] = {
            student_id: id
        }
        let sessionDetails = await Session.findAll(conditions);
        if (sessionDetails) {
            let query = `SELECT subjects.subjectName,sessions.id as sessionId, subjects.parent_subjectId From sessions
            INNER JOIN subjects ON sessions.subSubjectId = subjects.id
            WHERE sessions.student_id = ${id}
            GROUP BY sessions.id`;
            let queryResult = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
            const resObj = sessionDetails.map(session => {
                return Object.assign(
                    {},
                    {
                        session_id: session.id,
                        tutor_id: session.tutor_id,
                        slot_id: session.slot_id,
                        day: session.day,
                        startTime: session.startTime,
                        endTime: session.endTime,
                        date: session.date,
                        price: session.price,
                        sessionName: session.sessionName,
                        sessionStatus: session.sessionStatus,
                        tutorImage: session.tutor.imageUrl,
                        tutorName: session.tutor.user.firstName + " " + session.tutor.user.lastName,
                        tutorCountry: session.tutor.countryDetails.countryName,
                        subjectDetails: queryResult.filter(item => {
                            if (item && item.sessionId) {
                                return item.sessionId == session.id
                            }
                        })
                    }
                )
            })
            return resObj;
        }
    }


    // find session By Tutor Id
    Session.findSessionByTutorId = async (id = null) => {
        let conditions = {
            include: [
                {
                    model: sqConn.Tutor
                }, {
                    model: sqConn.Student,
                    include: [
                        {
                            model: sqConn.User,
                            attributes: ['firstName', 'id', 'lastName'],
                        }, {
                            model: sqConn.Country,
                            as: 'countryDetails',
                            attributes: ['countryName']
                        }
                    ]
                }
            ]
        }
        conditions['where'] = {
            tutor_id: id
        }
        let sessionDetails = await Session.findAll(conditions);
        if (sessionDetails) {
            let query = `SELECT subjects.subjectName,sessions.id as sessionId, subjects.parent_subjectId From sessions
                INNER JOIN subjects ON sessions.subSubjectId = subjects.id
                WHERE sessions.tutor_id = ${id}
                GROUP BY sessions.id`;
            let queryResult = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
            const resObj = sessionDetails.map(session => {
                return Object.assign(
                    {},
                    {
                        session_id: session.id,
                        student_id: session.student_id,
                        slot_id: session.slot_id,
                        day: session.day,
                        startTime: session.startTime,
                        endTime: session.endTime,
                        date: session.date,
                        price: session.price,
                        sessionName: session.sessionName,
                        sessionStatus: session.sessionStatus,
                        studentImage: session.student.imageUrl,
                        studentName: session.student.user.firstName + " " + session.student.user.lastName,
                        studentCountry: session.student.countryDetails.countryName,
                        subjectDetails: queryResult.filter(item => {
                            if (item && item.sessionId) {
                                return item.sessionId == session.id
                            }
                        })
                    }
                )
            })
            return resObj;
        }
    }


    // find session for all Students
    Session.findAllStudentSession = async () => {
        let conditions = {
            include: [
                {
                    model: sqConn.Tutor,
                    include: [
                        {
                            model: sqConn.User,
                            attributes: ['firstName', 'id', 'lastName'],
                        }, {
                            model: sqConn.Country,
                            as: 'countryDetails',
                            attributes: ['countryName']
                        }
                    ]
                }
            ]
        }
        let sessionDetails = await Session.findAll(conditions);
        if (sessionDetails) {
            let query = `SELECT subjects.subjectName,sessions.id as sessionId, subjects.parent_subjectId From sessions
                INNER JOIN subjects ON sessions.subSubjectId = subjects.id
                GROUP BY sessions.id`;
            let queryResult = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
            const resObj = sessionDetails.map(session => {
                return Object.assign(
                    {},
                    {
                        session_id: session.id,
                        tutor_id: session.tutor_id,
                        slot_id: session.slot_id,
                        day: session.day,
                        startTime: session.startTime,
                        endTime: session.endTime,
                        date: session.date,
                        price: session.price,
                        sessionName: session.sessionName,
                        sessionStatus: session.sessionStatus,
                        tutorImage: session.tutor.imageUrl,
                        tutorName: session.tutor.user.firstName + " " + session.tutor.user.lastName,
                        tutorCountry: session.tutor.countryDetails['countryName'],
                        subjectDetails: queryResult.filter(item => {
                            if (item && item.sessionId) {
                                return item.sessionId == session.id
                            }
                        })
                    }
                )
            })
            return resObj;
        }
    }

    // find session for all Tutors
    Session.findAllTutorSession = async () => {
        let conditions = {
            include: [
                {
                    model: sqConn.Tutor,

                }, {
                    model: sqConn.Student,
                    include: [
                        {
                            model: sqConn.User,
                            attributes: ['firstName', 'id', 'lastName'],
                        }, {
                            model: sqConn.Country,
                            as: 'countryDetails',
                            attributes: ['countryName']
                        }
                    ]
                }
            ]
        }
        let sessionDetails = await Session.findAll(conditions);
        if (sessionDetails) {
            let query = `SELECT subjects.subjectName,sessions.id as sessionId, subjects.parent_subjectId From sessions
                        INNER JOIN subjects ON sessions.subSubjectId = subjects.id
                        GROUP BY sessions.id`;
            let queryResult = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
            const resObj = sessionDetails.map(session => {
                return Object.assign(
                    {},
                    {
                        session_id: session.id,
                        student_id: session.student_id,
                        slot_id: session.slot_id,
                        day: session.day,
                        startTime: session.startTime,
                        endTime: session.endTime,
                        date: session.date,
                        price: session.price,
                        sessionName: session.sessionName,
                        sessionStatus: session.sessionStatus,
                        studentImage: session.student.imageUrl,
                        studentName: session.student.user.firstName + " " + session.student.user.lastName,
                        studentCountry: session.student.countryDetails['countryName'],
                        subjectDetails: queryResult.filter(item => {
                            if (item && item.sessionId) {
                                return item.sessionId == session.id
                            }
                        })
                    }
                )
            })
            return resObj;
        }
    }


    // Find All Session
    Session.findAllSession = () => {
        return Session.findAll()
            .then((sessionData) => {
                return sessionData;
            })
            .catch((err) => {
                throw err;
            });
    };


    // update Session
    Session.updateSession = (data = {}, id = null) => {
        let condition = {
            where: {
                id: id
            }
        };

        return Session.update(data, condition)
            .then((sessionData) => {
                return sessionData;
            })
            .catch((err) => {
                throw err;
            });
    };

    Session.belongsTo(Student, { foreignKey: 'student_id', targetKey: 'id' })
    Student.hasMany(Session, { foreignKey: 'student_id', targetKey: 'id' });
    Session.belongsTo(Tutor, { foreignKey: 'tutor_id', targetKey: 'id' })
    Tutor.hasMany(Session, { foreignKey: 'tutor_id', targetKey: 'id' })
    Tutor.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' })

    return Session;

};

