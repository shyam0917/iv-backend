const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    var Student = require('../student/student.model')(sequelize, Sequelize.DataTypes);
    var Tutor = require('../tutor/tutor.model')(sequelize, Sequelize.DataTypes);
    var User = require('../user/user.model')(sequelize, Sequelize.DataTypes);
    var StudentPayment = sequelize.define('student_payments',
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
            session_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
              },
            slot_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            price: {
                type: DataTypes.FLOAT,
            },
            transaction_Id: {
                type: DataTypes.STRING,
            },
            paymentStatus: {
                type: DataTypes.ENUM,
                defaultValue: 'paid',
                values: ['paid', 'pending']
            },
            createdAt: { type: DataTypes.DATE, defaultValue: new Date(), },
            updatedAt: { type: DataTypes.DATE, defaultValue: new Date() }
        }, {
        timestamps: true
    });

    // create payment for student
    StudentPayment.addTransaction = (data = {}) => {
        return StudentPayment.create(data)
            .then((paymentData) => {
                return paymentData;
            })
            .catch((err) => {
                throw err;
            });
    };


  
    // Session.belongsTo(Student, { foreignKey: 'student_id', targetKey: 'id' })
    // Student.hasMany(Session, { foreignKey: 'student_id', targetKey: 'id' });
    // Session.belongsTo(Tutor, { foreignKey: 'tutor_id', targetKey: 'id' })
    // Tutor.hasMany(Session, { foreignKey: 'tutor_id', targetKey: 'id' })
    // Tutor.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' })

    return StudentPayment;

};

