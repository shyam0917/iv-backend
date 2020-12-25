const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.getSqlConnection = (config) => {
let sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: 'mysql',
    host: '144.76.184.38',
    pool: {
        max: 5,
        min: 0,
        idle: 300000,
        acquire: 300000
    },
    logging: false,
    timestamps: true
})


sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((error) => {
    console.log('Unable to connect to the database:', error);
    throw error;
});

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: require("../api/user/user.model")(sequelize, Sequelize),
    Student: require("../api/student/student.model")(sequelize, Sequelize),
    Tutor: require("../api/tutor/tutor.model")(sequelize, Sequelize),
    Session: require("../api/session/session.model")(sequelize, Sequelize),
    Review: require("../api/reviews/reviews.model")(sequelize, Sequelize),
    Subject: require("../api/subject/subject.model")(sequelize, Sequelize),
    Country: require("../api/location/country.model")(sequelize, Sequelize),
    State: require("../api/location/state.model")(sequelize, Sequelize),
    City : require("../api/location/city.model")(sequelize, Sequelize),
    TutorAvailability: require("../api/tutor/tutorAvailability.model")(sequelize, Sequelize),
    UserSubject: require("../api/subject/userSubject.model")(sequelize, Sequelize),
    SessionBooking: require("../api/session/sessionBooking.model")(sequelize, Sequelize),
    StudentPayment: require("../api/payment/payment.model")(sequelize, Sequelize)
};

return db;

}