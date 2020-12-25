const { authRoutes } = require('../api/auth');
const { userRoutes } = require('../api/user');
const { studentRoutes } = require('../api/student');
const { tutorRoutes } =require('../api/tutor');
const { subjectRoutes } =require('../api/subject');
const { sessionRoutes } =require('../api/session');
const { reviewRoutes } = require('../api/reviews');
const { locationRoutes } = require('../api/location');
const { adminRoutes } = require('../api/admin');
const { paymentRoutes } = require('../api/payment');
 
const initialize = (app) => {
	app.use('/api/auth', authRoutes);
	app.use('/api/user', userRoutes);
	app.use('/api/student', studentRoutes);
	app.use('/api/tutor', tutorRoutes);
	app.use('/api/subject', subjectRoutes);
	app.use('/api/session', sessionRoutes);
	app.use('/api/review', reviewRoutes);
	app.use('/api/location',locationRoutes);
	app.use('/api/payment', paymentRoutes)
	app.use('/api/admin',adminRoutes);
	app.use('/api/pay', paymentRoutes);

};

module.exports = { initialize };
