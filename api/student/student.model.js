const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	var Country = require('../location/country.model')(sequelize, Sequelize.DataTypes);
	var State = require('../location/state.model')(sequelize, Sequelize.DataTypes);
	var City = require('../location/city.model')(sequelize, Sequelize.DataTypes);
	var Subject = require('../subject/subject.model')(sequelize, Sequelize.DataTypes);
	var User = require('../user/user.model')(sequelize, Sequelize.DataTypes);
	var Student = sequelize.define('students',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			dob: {
				type: DataTypes.DATEONLY,
			},
			mobileNo: {
				type: DataTypes.BIGINT(15)
			},
			country: {
				type: DataTypes.INTEGER
			},
			state: {
				type: DataTypes.INTEGER,
			},
			city: {
				type: DataTypes.INTEGER,
			},
			class: {
				type: DataTypes.STRING,
			},
			timeZone: {
				type: DataTypes.STRING,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				foreignKey: true,
			},
			imageUrl: {
				type: DataTypes.STRING,
			},
			nativeLanguage: {
				type: DataTypes.STRING,
			},
			subjects: {
				type: DataTypes.STRING
			},
			documentUpload: {
				type: DataTypes.STRING(500)
			},
			step: {
				type: DataTypes.INTEGER
			},
			isActive: {
				type: Sequelize.ENUM,
				defaultValue: '1',
				values: ['0', '1']
			},
			createdAt: { type: DataTypes.DATE, defaultValue: new Date(), },
			updatedAt: { type: DataTypes.DATE, defaultValue: new Date() }
		}, {
		timestamps: true
	}
	);

	// create Student
	Student.createStudent = (data = {}) => {
		return Student.create(data)
			.then((studentData) => {
				return studentData;
			})
			.catch((err) => {
				throw err;
			});
	};

	// find Student by userId
	Student.findStudentByUserId = (data = null) => {
		return Student.findOne({
			where: {
				user_id: data
			},
		})
			.then((studentData) => {
				return studentData;
			})
			.catch((err) => {
				throw err;
			});
	};

	// find Student by Id
	Student.findStudentById = (id = null) => {
		return Student.findOne({
			where: {
				id: id
			},
		})
			.then((studentData) => {
				return studentData;
			})
			.catch((err) => {
				throw err;
			});
	};


	// get student sessions
	Student.findStudentDetails = async (id = null) => {
		let conditions = {
			include: [
				{
					model: sqConn.User,
					attributes: ['firstName', 'id', 'lastName', 'lessonReminder', 'generalReminder', 'email'],

				}, {
					model: sqConn.Country,
					as: 'countryDetails'
				}, {
					model: sqConn.State,
					as: 'stateDetails',
				}, {
					model: sqConn.City,
					as: 'cityDetails',
				}
			]
		}
		conditions['where'] = {
			user_id: id
		}
		let studentDetails = await Student.findOne(conditions);
		if (studentDetails) {
			// let query = `SELECT students.id as studentId, subjects.id as subjectId, subjects.subjectName, subjects.parent_subjectId FROM students
			// 	INNER JOIN user_subjects ON students.user_id=user_subjects.user_Id
			// 	LEFT OUTER JOIN subjects ON user_subjects.subSubjectId=subjects.id OR user_subjects.subjectId=subjects.id
			// 	WHERE students.id = ${studentDetails.id}
			// 	GROUP BY subjects.subjectName,students.user_id`;

			// let queryResult = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
			const resObj = {
				student_id: studentDetails.id,
				nativeLanguage: studentDetails.nativeLanguage,
				dob: studentDetails.dob,
				imageUrl: studentDetails.imageUrl,
				firstName: studentDetails.user.firstName,
				lastName: studentDetails.user.lastName,
				email: studentDetails.user.email,
				country: studentDetails.countryDetails && studentDetails.countryDetails.id,
				state: studentDetails.stateDetails && studentDetails.stateDetails.id,
				city: studentDetails.stateDetails && studentDetails.cityDetails.id,
				userId: studentDetails.user_id,
				class: studentDetails.class,
				timeZone: studentDetails.timeZone,
				imageUrl: studentDetails.imageUrl,
				documentUpload: JSON.parse(studentDetails.documentUpload),
				step: studentDetails.step,
				mobileNo: studentDetails.mobileNo,
				lessonReminder: studentDetails.user.lessonReminder,
				generalReminder: studentDetails.user.generalReminder,
				subjects: studentDetails.subjects
				// subjectData: queryResult.filter(item => {
				// 	if (item && item.studentId == studentDetails.id) {
				// 		return item.studentId == studentDetails.id
				// 	}

				// })
			}
			return resObj;
		}
	}


	// find all student details
	Student.findAllStudentDetails = async () => {
		let conditions = {
			include: [
				{
					model: sqConn.User,
					attributes: ['firstName', 'id', 'lastName', 'lessonReminder', 'generalReminder'],

				}, {
					model: sqConn.Country,
					as: 'countryDetails'
				}, {
					model: sqConn.State,
					as: 'stateDetails',
				}, {
					model: sqConn.City,
					as: 'cityDetails',
				}
			]
		}

		let studentDetails = await Student.findAll(conditions);
		if (studentDetails) {
			// let query = `SELECT students.id as studentId, subjects.id as subjectId, subjects.subjectName, subjects.parent_subjectId FROM students
			// 		INNER JOIN user_subjects ON students.user_id=user_subjects.user_Id
			// 		LEFT OUTER JOIN subjects ON user_subjects.subSubjectId=subjects.id OR user_subjects.subjectId=subjects.id
			// 		GROUP BY subjects.subjectName,students.user_id`;

			// let queryResult = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

			const resObj = studentDetails.map(student => {
				return Object.assign(
					{},
					{
						student_id: student.id,
						nativeLanguage: student.nativeLanguage,
						dob: student.dob,
						imageUrl: student.imageUrl,
						firstName: student.user.firstName,
						lastName: student.user.lastName,
						country: student.countryDetails,
						state: student.stateDetails,
						city: student.cityDetails,
						userId: student.user_id,
						class: student.class,
						timeZone: student.timeZone,
						imageUrl: student.imageUrl,
						documentUpload: JSON.parse(student.documentUpload),
						step: student.step,
						mobileNo: student.mobileNo,
						lessonReminder: student.user.lessonReminder,
						generalReminder: student.user.generalReminder,
						subjects: student.subjects
						// subjectData: queryResult.filter(item => {
						// 	if (item && item.studentId == student.id) {
						// 		return item.studentId == student.id
						// 	}

						// })
					}
				)
			})

			return resObj;
		}
	}


	// find Student Subject Details 
	Student.findSubjectDetails = (id = null) => {
		let query = `SELECT students.user_id,subjects.id,subjects.subjectName, subjects.parent_subjectId FROM students
		INNER JOIN user_subjects ON students.user_id=user_subjects.user_Id
		INNER JOIN subjects ON user_subjects.subSubjectId=subjects.id OR user_subjects.subjectId=subjects.id
		WHERE students.user_id = ${id}
		GROUP BY subjects.subjectName`;
		return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((result, err) => {
			if (err) {
				throw err;
			}
			return result
		})
	};

	// find All Students Subject Details 
	Student.findAllSubjectDetails = () => {
		let query = `SELECT students.user_id, subjects.id, subjects.subjectName, subjects.parent_subjectId FROM students
		INNER JOIN user_subjects ON students.user_id=user_subjects.user_Id
		LEFT OUTER JOIN subjects ON user_subjects.subSubjectId=subjects.id OR user_subjects.subjectId=subjects.id
		GROUP BY subjects.subjectName,students.user_id;`;
		return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((result, err) => {
			if (err) {
				throw err;
			}
			return result
		})
	};

	// get my tutor details
	Student.findmyTutorsDetails = (id = null) => {
		let query = `SELECT users.firstName,users.lastName,countries.countryName,tutors.id as tutorId,sessions.sessionStatus,
				count(sessions.tutor_id) as sessionCount FROM sessions
				INNER JOIN tutors ON sessions.tutor_id = tutors.id
				INNER JOIN countries ON tutors.country = countries.id
				INNER JOIN users ON tutors.user_id = users.id
				INNER JOIN students ON students.id = sessions.student_id
				where students.user_id = ${id} AND users.isActive ='1' AND users.isAdminVerified = '1'
				GROUP BY tutors.id,sessions.sessionStatus
				ORDER BY sessions.sessionStatus`;
		return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then((result, err) => {
			if (err) {
				throw err;
			}
			return result
		})
	};


	// update Student by userId
	Student.updateStudent = (data = {}, id = null) => {
		let condition = {
			where: {
				user_id: id
			},
		};
		return Student.update(data, condition)
			.then((studentData) => {
				return studentData;
			})
			.catch((err) => {
				throw err;
			});
	};


	Student.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
	Student.belongsTo(Country, { as: 'countryDetails', foreignKey: 'country', targetKey: 'id' });
	Student.belongsTo(State, { as: 'stateDetails', foreignKey: 'state', targetKey: 'id' });
	Student.belongsTo(City, { as: 'cityDetails', foreignKey: 'city', targetKey: 'id' });

	return Student;

};