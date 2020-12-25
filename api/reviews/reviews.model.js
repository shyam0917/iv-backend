const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    // var Session = require('../session/session.model')(sequelize, Sequelize.DataTypes);
    var User = require('../user/user.model')(sequelize, Sequelize.DataTypes);
    var Review = sequelize.define('reviews',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            session_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            student_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            tutor_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            review: {
                type: DataTypes.STRING(500),
            },
            rating: {
                type: DataTypes.DOUBLE,
            },
            createdAt: { type: DataTypes.DATE, defaultValue: new Date(), },
            updatedAt: { type: DataTypes.DATE, defaultValue: new Date() }
        }, {
        timestamps: true
    });

    // create a review
    Review.createReview = (data = {}) => {
        return Review.create(data)
            .then((reviewData) => {
                return reviewData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // get Tutor Reviews by Id
    Review.findTutorReviewsById = async (id = null, params = {}) => {
        let query = `SELECT reviews.session_id,users.firstName,users.lastName,students.imageUrl,reviews.rating,reviews.review,reviews.updatedAt as reviewedAt FROM reviews
        INNER JOIN sessions ON sessions.id = reviews.session_id
        INNER JOIN students ON students.id = sessions.student_id
        INNER JOIN users ON users.id = students.user_id
        WHERE sessions.tutor_id = ${id}
        Group by reviews.id LIMIT ${params.results} OFFSET ${(params.page - 1) * params.results}`;

        const reviewData = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
        if (reviewData) {
            let query = `SELECT avg(reviews.rating) as AvgRating FROM reviews
            INNER JOIN sessions ON sessions.id = reviews.session_id
            INNER JOIN students ON students.id = sessions.student_id
            INNER JOIN users ON users.id = students.user_id
            WHERE sessions.tutor_id = ${id};`;
            const ratingData = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
            const resObj = {
                reviewDetails: reviewData,
                avgRating: ratingData[0].AvgRating
            }
            return resObj
        }
    };

    // get All Tutor Reviews
    Review.findAllTutorReviews = async (params = {}) => {
        let query = `SELECT sessions.tutor_id,sessions.student_id,reviews.session_id,users.firstName,users.lastName,students.imageUrl,reviews.rating,reviews.review,reviews.updatedAt as reviewedAt FROM reviews
            INNER JOIN sessions ON sessions.id = reviews.session_id
            INNER JOIN students ON students.id = sessions.student_id
            INNER JOIN users ON users.id = students.user_id
            Group by reviews.id`;
        const reviewData = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
        if (reviewData) {
            let query = `SELECT avg(reviews.rating) as AvgRating,sessions.tutor_id FROM reviews
                INNER JOIN sessions ON sessions.id = reviews.session_id
                INNER JOIN students ON students.id = sessions.student_id
                INNER JOIN users ON users.id = students.user_id
                GROUP BY sessions.tutor_id`;
            const ratingData = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
            let newArray = [];
            let newItemArray = [];
            const resObj = await reviewData.map(async (item) => {
                await ratingData.map(review => {
                    if (review.tutor_id === item.tutor_id) {
                        item.avgRating = review.AvgRating
                    }
                })
                let {
                    firstName,
                    imageUrl,
                    lastName,
                    rating,
                    review,
                    reviewedAt,
                    session_id,
                    student_id
                } = item;
                let obj1 = {
                    firstName,
                    imageUrl,
                    lastName,
                    rating,
                    review,
                    reviewedAt,
                    session_id,
                    student_id
                }
                if (newArray.includes(item.tutor_id)) {
                    newItemArray.map(elm => {
                        if (elm.tutor_id === item.tutor_id) {
                            elm.reviews.push(obj1)
                        }
                    })
                }
                else {
                    newArray.push(item.tutor_id);
                    let obj = { tutor_id: item.tutor_id, avgRating: item.avgRating, reviews: [obj1] };
                    newItemArray.push(obj);

                }
            })
            return newItemArray
        }
    };


    // find a review  
    Review.findReviewBySessionId = (id = null) => {
        let condition = {
            where: {
                session_id: id
            }
        };

        return Review.findOne(condition)
            .then((reviewData) => {
                return reviewData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // update a review
    Review.updateReview = (data = {}, id = null) => {
        let condition = {
            where: {
                session_id: id
            }
        };

        return Review.update(data, condition)
            .then((reviewData) => {
                return reviewData;
            })
            .catch((err) => {
                throw err;
            });
    };

    // Review.belongsTo(Session, { foreignKey: 'session_id', targetKey: 'id' });
    // Student.hasMany(Session, { foreignKey: 'student_id', targetKey: 'id' });
    // Session.belongsTo(Tutor, { foreignKey: 'tutor_id', targetKey: 'id' })
    // Tutor.hasMany(Review, { foreignKey: 'tutor_id', targetKey: 'id' })
    // Tutor.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' })


    return Review;

};

