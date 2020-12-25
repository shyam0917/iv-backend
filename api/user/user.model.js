const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {

	var User = sequelize.define('users',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false
			},
			lessonReminder: {
				type: Sequelize.ENUM,
				defaultValue: '1',
				values: ['0', '1']
			},
			generalReminder: {
				type: Sequelize.ENUM,
				defaultValue: '1',
				values: ['0', '1']
			},
			isActive: {
				type: DataTypes.ENUM,
				defaultValue: '0',
				values: ['0', '1']
			},
			isVerified: {
				type: DataTypes.ENUM,
				defaultValue: '0',
				values: ['0', '1']
			},
			isAdminVerified: {
				type: Sequelize.ENUM,
				defaultValue: '0',
				values: ['0', '1']
			},
			createdAt: { type: DataTypes.DATE, defaultValue: new Date(), },
			updatedAt: { type: DataTypes.DATE, defaultValue: new Date() }
		},
		{
			timestamps: true
		}
	);


	// create User
	User.createUser = (data = {}) => {
		return User.create(data)
			.then((userData) => {
				return userData;
			})
			.catch((err) => {
				throw err;
			});
	};

	// Find User By Id
	User.findUserById = (id = null) => {
		return User.findByPk(id)
			.then((userData) => {
				return userData;
			})
			.catch((err) => {
				throw err;
			});
	};

	// Find User by Email
	User.findUserByEmail = (email = null) => {
		return User.findOne({
			where: {
				email: email
			},
		})
			.then((userData) => {
				return userData;
			})
			.catch((err) => {
				throw err;
			});
	};

	// Activate User
	User.VerifyUser = (data = {}, id = null) => {
		let condition = {
			where: {
				id: id
			}
		};
		return User.update(data, condition)
			.then((activeuser) => {
				return activeuser;
			})
			.catch((err) => {
				throw err;
			});
	};

	// Update User
	User.updateUserPassword = (data = {}, ) => {
		let saveDetails = {
			password: data.password,
			updatedAt: Sequelize.DATE
		}
		let condition = {
			where: {
				id: data.id
			},
		};
		return User.update(saveDetails, condition)
			.then((updatedUser) => {
				return updatedUser;
			})
			.catch((err) => {
				throw err;
			});
	};

	// DeActivate User
	User.deactivateUser = (data = {}, id = null) => {
		let condition = {
			where: {
				id: id
			}
		};
		return User.update(data, condition)
			.then((deActiveuser) => {
				return deActiveuser;
			})
			.catch((err) => {
				throw err;
			});
	};

	// update User
	User.updateUser = (data = {}, id = null) => {
		let condition = {
			where: {
				id: id
			}
		};
		return User.update(data, condition)
			.then((notifyUser) => {
				return notifyUser;
			})
			.catch((err) => {
				throw err;
			});
	};

	// mark Verified User
	User.markVerified = (data = {}, id = null) => {
		let condition = {
			where: {
				id: id
			}
		};
		return User.update(data, condition)
			.then((verifieduser) => {
				return verifieduser;
			})
			.catch((err) => {
				throw err;
			});
	};

	return User;

};

