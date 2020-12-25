const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = (sequelize, DataTypes) => {

    var Subject = sequelize.define('subjects',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            subjectName: {
                type: DataTypes.STRING
            },
            parent_subjectId: {
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

    // create Subject
    Subject.createSubject = (data = {}) => {
        return Subject.create(data)
            .then((subjectData) => {
                return subjectData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // Get Subjects by name
    Subject.findSubjectByName = (data = '') => {
        return sequelize.query(`SELECT * FROM subjects WHERE subjects.subjectName LIKE '%${data}%'`, { type: Sequelize.QueryTypes.SELECT }).then(result => {
            return result;
        }).catch(err => {
            throw err;
        })

    };

    // Get Subjects list with count by name
    Subject.findSubjectListWithCount = () => {
        return sequelize.query(`SELECT subjects.subjectName,COUNT(students.id) as studentCount From subjects
        INNER JOIN user_subjects ON subjects.id = user_subjects.subSubjectId
        LEFT OUTER JOIN students ON user_subjects.user_Id = students.user_id
        GROUP BY subjects.subjectName`, { type: Sequelize.QueryTypes.SELECT }).then(result => {
            return result;
        }).catch(err => {
            throw err;
        })

    };

        // Get Subject with count by name
        Subject.findSubjectWithCount = (data = '') => {
            return sequelize.query(`SELECT subjects.subjectName,COUNT(students.id) as studentCount From subjects
            INNER JOIN user_subjects ON subjects.id = user_subjects.subSubjectId
            LEFT OUTER JOIN students ON user_subjects.user_Id = students.user_id
            WHERE subjects.subjectName = '${data}'
            GROUP BY subjects.subjectName`, { type: Sequelize.QueryTypes.SELECT }).then(result => {
                return result;
            }).catch(err => {
                throw err;
            })
    
        };


    return Subject;

};

