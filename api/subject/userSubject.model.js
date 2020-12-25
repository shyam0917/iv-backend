const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = (sequelize, DataTypes) => {

    var UserSubject = sequelize.define('user_subjects',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_Id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            subjectId: {
                type: DataTypes.INTEGER
            },
            subSubjectId: {
                type: DataTypes.INTEGER
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

    // create User Subject List
    UserSubject.createSubjectList = (data = {}) => {
        return UserSubject.create(data)
            .then((subjectData) => {
                return subjectData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // Update User Subject List
    UserSubject.updateSubjectList = (data = {},id) => {
        let condition = {
            where: {
                user_id: id
            },
        };
        return UserSubject.update(data, condition)
            .then((subjectData) => {
                return subjectData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // Delete User Subject List
    UserSubject.deleteSubjectList = (data = null) => {
        let condition = {
            where: {
                user_Id: data
            },
        };
        return UserSubject.destroy(condition)
            .then((subjectData) => {
                return subjectData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // // Get Subjects by name
    // Subject.findSubjectByName = (data = {}) => {
    //     return sequelize.query(`SELECT id, subjectName, sub_subjectName, createdAt, updatedAt FROM subjects AS subjects WHERE subjects.subjectName LIKE '%${data}%'`, { type: Sequelize.QueryTypes.SELECT }).then(result => {
    //         return result;
    //     }).catch(err => {
    //         throw err;
    //     })

    // };


    return UserSubject;

};

