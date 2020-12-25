const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {

    var Country = require('../location/country.model')(sequelize, Sequelize.DataTypes);
    var State = require('../location/state.model')(sequelize, Sequelize.DataTypes);
    var City = require('../location/city.model')(sequelize, Sequelize.DataTypes);
    var Subject = require('../subject/subject.model')(sequelize, Sequelize.DataTypes);
    var UserSubject = require('../subject/userSubject.model')(sequelize, Sequelize.DataTypes);
    var User = require('../user/user.model')(sequelize, Sequelize.DataTypes);
    var Review = require('../reviews/reviews.model')(sequelize, Sequelize.DataTypes);
    var TutorAvailability = require('../tutor/tutorAvailability.model')(sequelize, Sequelize.DataTypes);

    var Tutor = sequelize.define('tutors',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            dob: {
                type: DataTypes.DATEONLY,
            },
            country: {
                type: Sequelize.INTEGER,
            },
            state: {
                type: DataTypes.INTEGER
            },
            city: {
                type: DataTypes.INTEGER
            },
            mobileNo: {
                type: DataTypes.BIGINT(15)
            },
            iyzicoId: {
                type: DataTypes.STRING
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            imageUrl: {
                type: DataTypes.STRING
            },
            nativeLanguage: {
                type: DataTypes.STRING
            },
            otherLanguage: {
                type: DataTypes.STRING
            },
            timeZone: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            costperSession: {
                type: DataTypes.INTEGER
            },
            certificates: {
                type: DataTypes.STRING(500)
            },
            education: {
                type: DataTypes.STRING(500)
            },
            professionalDetails: {
                type: DataTypes.STRING(500)
            },
            awards: {
                type: DataTypes.STRING(500)
            },
            step: {
                type: DataTypes.INTEGER
            },
            documentUpload: {
                type: Sequelize.STRING(500)
            },
            isActive: {
                type: Sequelize.ENUM,
                defaultValue: '1',
                values: ['0', '1']
            },
            createdAt: { type: DataTypes.DATE, defaultValue: new Date(), },
            updatedAt: { type: DataTypes.DATE, defaultValue: new Date() }
        },
        {
            timestamps: true
        }
    );

    // create Tutor
    Tutor.createTutor = (data = {}) => {
        return Tutor.create(data)
            .then((tutorData) => {
                return tutorData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // Find Tutor By User Id
    Tutor.findTutorByUserId = (id = null) => {
        return Tutor.findOne({
            where: {
                user_id: id
            },
        })
            .then((tutorData) => {
                return tutorData;
            })
            .catch((err) => {
                throw err;
            });
    };


    // get list of tutors for particular tutor subject
    Tutor.findTutorBySubject = (data = null) => {
        let query = `SELECT users.firstName,users.lastName,users.isAdminVerified,tutors.id as tutor_Id,tutors.imageUrl,tutors.nativeLanguage,tutors.description,countries.countryName,subjects.id as subjectId, subjects.subjectName, subjects.parent_subjectId FROM tutors
        INNER JOIN users ON tutors.user_id=users.id
        INNER JOIN countries ON tutors.country = countries.id
        INNER JOIN user_subjects ON users.id=user_subjects.user_Id
        INNER JOIN subjects ON user_subjects.subSubjectId=subjects.id OR user_subjects.subjectId=subjects.id
        WHERE subjects.subjectName = '${data}' AND users.isAdminVerified = '1'
        GROUP BY subjects.subjectName,tutors.id`;
        return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((result, err) => {
            if (err) {
                throw err;
            }
            return result
        })
    };


    // get Reviews of students for all tutors
    // Tutor.findAllTutorReviews = () => {
    //     let query = `SELECT sessions.tutor_id,sessions.student_id,users.firstName,users.lastName,students.imageUrl,reviews.rating,reviews.review,reviews.updatedAt as reviewedAt FROM reviews
    //         INNER JOIN sessions ON sessions.id = reviews.session_id
    //         INNER JOIN students ON students.id = sessions.student_id
    //         INNER JOIN users ON users.id = students.user_id
    //         WHERE sessions.isActive ='1'`;
    //     return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((result, err) => {
    //         if (err) {
    //             throw err;
    //         }
    //         return result
    //     })
    // };

    // get students count with no of sessions and reviews for particular tutor
    Tutor.getStudentCount = (id = null) => {
        let query = `SELECT COUNT( DISTINCT student_id) as students,count(sessions.id) as sessions,sessions.tutor_id,count(reviews.session_id) as reviews From sessions
        LEFT OUTER JOIN reviews ON sessions.id = reviews.session_id
        WHERE sessions.sessionStatus="completed" AND sessions.tutor_id = ${id}`;
        return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((result, err) => {
            if (err) {
                throw err;
            }
            return result
        })
    };

    // get all students count with no of sessions and reviews
    Tutor.getAllStudentCount = () => {
        let query = `SELECT COUNT( DISTINCT student_id) as students,count(sessions.id) as sessions,tutor_id,count(reviews.session_id) as reviews From sessions
        LEFT OUTER JOIN reviews ON sessions.id = reviews.session_id
        WHERE sessions.sessionStatus = 'completed'
        GROUP BY sessions.tutor_id;`;
        return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((result, err) => {
            if (err) {
                throw err;
            }
            return result
        })
    };


    // find tutor Subject Details 
    Tutor.findSubjectDetails = (id = null) => {
        let query = `SELECT tutors.user_id, subjects.id, subjects.subjectName, subjects.parent_subjectId FROM tutors
        INNER JOIN user_subjects ON tutors.user_id=user_subjects.user_Id
        INNER JOIN subjects ON user_subjects.subSubjectId=subjects.id OR user_subjects.subjectId=subjects.id
        WHERE tutors.user_id = ${id}
        GROUP BY subjects.subjectName`;
        return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((result, err) => {
            if (err) {
                throw err;
            }
            return result
        })
    };

    // find all tutor Subject Details 
    Tutor.findAllSubjectDetails = () => {
        let query = `SELECT tutors.user_id, subjects.id, subjects.subjectName, subjects.parent_subjectId FROM tutors
        INNER JOIN user_subjects ON tutors.user_id=user_subjects.user_Id
        LEFT OUTER JOIN subjects ON user_subjects.subSubjectId=subjects.id OR user_subjects.subjectId=subjects.id
        GROUP BY subjects.subjectName,tutors.user_id;`;
        return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((result, err) => {
            if (err) {
                throw err;
            }
            return result
        })
    };

    // find session Details of Tutor
    // Tutor.findSessionDetails = () => {
    //     let query = `SELECT tutors.user_id, subjects.id, subjects.subjectName, subjects.parent_subjectId FROM tutors
    //         INNER JOIN user_subjects ON tutors.user_id=user_subjects.user_Id
    //         LEFT OUTER JOIN subjects ON user_subjects.subSubjectId=subjects.id OR user_subjects.subjectId=subjects.id
    //         GROUP BY subjects.subjectName,tutors.user_id;`;
    //     return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((result, err) => {
    //         if (err) {
    //             throw err;
    //         }
    //         return result
    //     })
    // };


    // find tutor details with availability of Tutor
    // Tutor.findTutorDetails = () => {
    //     let query = `Select users.firstName,users.lastName,users.id,countries.countryName,states.stateName,cities.cityName,
    //     tutors.nativeLanguage,tutors.description,tutors.id as tutorId,tutors.costperSession,tutors.education,tutors.professionalDetails,tutor_availabilities.timeZone,tutor_availabilities.day,tutor_availabilities.time,tutors.isActive From tutors
    //     INNER JOIN users ON users.id = tutors.user_id
    //     INNER JOIN tutor_availabilities ON tutor_availabilities.tutor_Id = tutors.id 
    //     INNER JOIN countries ON tutors.country = countries.id
    //     INNER JOIN states ON tutors.state = states.id
    //     INNER JOIN cities ON tutors.city = cities.id`;
    //     return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((result, err) => {
    //         if (err) {
    //             throw err;
    //         }
    //         return result
    //     })
    // };


    // find tutor details
    Tutor.findTutorDetails = async (id = null) => {
        let conditions = {
            include: [
                {
                    model: sqConn.User,
                    attributes: ['firstName', 'id', 'lastName', 'isAdminVerified'],

                }, {
                    model: sqConn.Country,
                    as: 'countryDetails'
                }, {
                    model: sqConn.State,
                    as: 'stateDetails',
                }, {
                    model: sqConn.City,
                    as: 'cityDetails',
                },
                {
                    model: sqConn.TutorAvailability,
                    attributes: ['id','day', 'start_time', 'end_time'],
                    as: 'tutorAvailability'
                }
            ]
        }
        conditions['where'] = {
            id: id
        }
        let tutorDetails = await Tutor.findOne(conditions);
        if (tutorDetails) {
            let query = `SELECT tutors.id as tutorId, subjects.id as subjectId, subjects.subjectName, subjects.parent_subjectId FROM tutors
            INNER JOIN user_subjects ON tutors.user_id=user_subjects.user_Id
            LEFT OUTER JOIN subjects ON user_subjects.subSubjectId=subjects.id OR user_subjects.subjectId=subjects.id
            WHERE tutors.id = ${id}
            GROUP BY subjects.subjectName,tutors.user_id`;

            let queryResult = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
            const resObj = {
                tutor_id: tutorDetails.id,
                nativeLanguage: tutorDetails.nativeLanguage,
                imageUrl: tutorDetails.imageUrl,
                certificates: JSON.parse(tutorDetails.certificates),
                awards: JSON.parse(tutorDetails.awards),
                firstName: tutorDetails.user.firstName,
                lastName: tutorDetails.user.lastName,
                country: tutorDetails.countryDetails.id,
                state: tutorDetails.stateDetails.id,
                city: tutorDetails.cityDetails.id,
                iyzicoId: tutorDetails.iyzicoId,
                description: tutorDetails.description,
                timeZone: tutorDetails.timeZone,
                education: JSON.parse(tutorDetails.education),
                professionalDetails: JSON.parse(tutorDetails.professionalDetails),
                costperSession: tutorDetails.costperSession,
                mobileNo: tutorDetails.mobileNo,
                isAdminVerified: tutorDetails.user.isAdminVerified,
                step: tutorDetails.step,
                availability: tutorDetails.tutorAvailability,
                subjects: queryResult.filter(item => {
                    if (item && item.tutorId) {
                        return item.tutorId == tutorDetails.id
                    }

                })
            }
            return resObj;
        }
    }


    // find all basic details
    Tutor.findAllTutor = async () => {

        let conditions = {
            include: [
                {
                    model: sqConn.User,
                    attributes: ['firstName', 'id', 'lastName', 'isAdminVerified'],
                    where: {
                        isAdminVerified: '1',
                    }

                }, {
                    model: sqConn.Country,
                    as: 'countryDetails'
                }, {
                    model: sqConn.State,
                    as: 'stateDetails',
                }, {
                    model: sqConn.City,
                    as: 'cityDetails',
                },
                {
                    model: sqConn.TutorAvailability,
                    attributes: ['id','day', 'start_time', 'end_time'],
                    as: 'tutorAvailability'
                }
            ]
        }

        let tutorDetails = await Tutor.findAll(conditions);
        if (tutorDetails) {
            let query = `SELECT tutors.id as tutorId, subjects.id as subjectId, subjects.subjectName, subjects.parent_subjectId FROM tutors
                INNER JOIN user_subjects ON tutors.user_id=user_subjects.user_Id
                LEFT OUTER JOIN subjects ON user_subjects.subSubjectId=subjects.id OR user_subjects.subjectId=subjects.id
                GROUP BY subjects.subjectName,tutors.user_id`;

            let queryResult = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
            const resObj = tutorDetails.map(tutor => {
                return Object.assign(
                    {},
                    {
                        tutor_id: tutor.id,
                        nativeLanguage: tutor.nativeLanguage,
                        imageUrl: tutor.imageUrl,
                        certificates: JSON.parse(tutor.certificates),
                        awards: JSON.parse(tutor.awards),
                        firstName: tutor.user.firstName,
                        lastName: tutor.user.lastName,
                        country: tutor.countryDetails.id,
                        state: tutor.stateDetails.id,
                        city: tutor.cityDetails.id,
                        iyzicoId: tutor.iyzicoId,
                        timeZone: tutor.timeZone,
                        description: tutor.description,
                        education: JSON.parse(tutor.education),
                        professionalDetails: JSON.parse(tutor.professionalDetails),
                        costperSession: tutor.costperSession,
                        mobileNo: tutor.mobileNo,
                        step: tutor.step,
                        availability: tutor.tutor_availabilities,
                        subjects: queryResult.filter(item => {
                            return item.tutorId == tutor.id
                        })
                    }
                )
            })
            return resObj;
        }
    }

    // find all basic details
    Tutor.findTutorList = async (params = {}, searchByAnd = []) => {
        let sortBy = [];
        if (params.sortField == 'firstName') {
            sortBy = [{ model: sequelize.models.User }, params.sortField, params.sortOrder]
        }
        else if (params.sortField == 'costperSession') {
            sortBy = [{ model: sequelize.models.Tutor }, params.sortField, params.sortOrder]
        } else {
            sortBy = [{ model: sequelize.models.Review }, params.sortField, params.sortOrder]
        }
        conditions = {
            attributes: ['id', 'imageUrl', 'description', 'costperSession', 'nativeLanguage'],
            include: [
                {
                    model: sqConn.User,
                    attributes: ['firstName', 'id', 'lastName'],
                    as: 'user',
                    where: {
                        isAdminVerified: '1',
                    },

                }, {
                    model: sqConn.Country,
                    as: 'countryDetails',
                },
                {
                    model: sqConn.UserSubject,
                    as: 'userSubject',
                },
                {
                    model: sqConn.Review,
                    attributes: ['rating'],
                },
                {
                    model: sqConn.TutorAvailability,
                    attributes: ['day', 'start_time', 'end_time'],
                    as: 'tutorAvailability',
                    where: {
                       book_status: 'available'
                    }
                }
            ],
            order: [sortBy],
        }

        if (!params.st && !params.sub) {
            conditions['where'] = {
                [Op.and]: searchByAnd
            }
        }
        if (params.sub) {
            conditions['where'] = {
                [Op.and]: searchByAnd,
                [Op.or]: [
                    {
                        '$userSubject.subjectId$': parseInt(params.sub),
                    },
                    {
                        '$userSubject.subSubjectId$': parseInt(params.sub)
                    }
                ]
            }
        }

        if (params.st && params.et && !params.sub) {
            conditions['where'] = {
                [Op.and]: searchByAnd,
                [Op.or]: [
                    {
                        '$tutorAvailability.start_time$': { [Op.between]: [params.st, params.et] },
                    },
                    {
                        '$tutorAvailability.end_time$': { [Op.between]: [params.st, params.et] }
                    }
                ]


            }
        }


        let tutorDetails = await Tutor.findAll(conditions);
        if (tutorDetails) {
            let countquery = `SELECT COUNT( DISTINCT sessions.student_id) as students,count(sessions.id) as sessions,sessions.tutor_id,count(reviews.session_id) as reviews From sessions
                LEFT OUTER JOIN reviews ON sessions.id = reviews.session_id
                WHERE sessions.sessionStatus = 'completed'
                GROUP BY sessions.tutor_id;`

            let countResult = await sequelize.query(countquery, { type: Sequelize.QueryTypes.SELECT });
            const resObj = tutorDetails.map(tutor => {
                return Object.assign(
                    {},
                    {
                        tutor_id: tutor.id,
                        nativeLanguage: tutor.nativeLanguage,
                        imageUrl: tutor.imageUrl,
                        firstName: tutor.user.firstName,
                        lastName: tutor.user.lastName,
                        country: tutor.countryDetails.countryName,
                        description: tutor.description,
                        availability: tutor.tutor_availabilities,
                        costperSession: tutor.costperSession,
                        avgRating: tutor.reviews.reduce(function (sum, student) {
                            return sum + parseFloat(student.rating);
                        }, 0) / tutor.reviews.length,
                        countDetails: countResult.filter(item => {
                            return item.tutor_id == tutor.id
                        }),
                    }
                )
            })
            return resObj;
        }
    }




    // update Tutor
    Tutor.updateTutor = (data = {}, id = null) => {
        let condition = {
            where: {
                user_id: id
            }
        };
        return Tutor.update(data, condition)
            .then((tutorData) => {
                return tutorData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // delete Tutor Files
    Tutor.deleteTutorFile = (data = {}, id = null) => {
        let query = `UPDATE tutors SET  ${data}= null WHERE id = ${id}`;
        return sequelize.query(query, { type: Sequelize.QueryTypes.UPDATE }).then((result, err) => {
            if (err) {
                throw err
            }
            return result;
        })
    };

    // update Tutor Files
    Tutor.updateTutorFile = (data = {}, id = null) => {
        let query = `UPDATE tutors SET  ${data.column}= '${data.columnData}' WHERE user_id = ${id}`;
        return sequelize.query(query, { type: Sequelize.QueryTypes.UPDATE }).then((result, err) => {
            if (err) {
                throw err;
            }
            return result
        })
    };


    Tutor.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
    Tutor.hasMany(UserSubject, { as: 'userSubject', foreignKey: 'user_Id', targetKey: 'user_id' });
    Tutor.belongsTo(Country, { as: 'countryDetails', foreignKey: 'country', targetKey: 'id' });
    Tutor.belongsTo(State, { as: 'stateDetails', foreignKey: 'state', targetKey: 'id' });
    Tutor.belongsTo(City, { as: 'cityDetails', foreignKey: 'city', targetKey: 'id' });
    Review.belongsTo(Tutor, { foreignKey: 'tutor_id', targetKey: 'id' });
    Tutor.hasMany(Review, { foreignKey: 'tutor_id', targetKey: 'id' });
    Tutor.hasMany(TutorAvailability, { as: 'tutorAvailability', foreignKey: 'tutor_Id', targetKey: 'id' });

    return Tutor;

};






