require('dotenv').config();
var dbConfig = require('./config.json');
let dbEnv;
if (process.env.ENV == 'development') {
	dbEnv = dbConfig.development
}
if (process.env.ENV == 'local') {
	dbEnv = dbConfig.test
}
if (process.env.ENV == 'production') {
	dbEnv = dbConfig.production
}


exports.data = {

	sql: {
		host: dbEnv.host,
		port: parseInt(process.env.DB_PORT),
		database: dbEnv.database,
		username: dbEnv.username,
		password: dbEnv.password
	},
	smtp: {
		host: process.env.SMTP_HOST,
		secureConnection: process.env.SMTP_SECURE_CONNECTION === 'true' ? true : false,
		port: parseInt(process.env.SMTP_PORT),
		auth: {
			user: process.env.SMTP_AUTH_USER,
			pass: process.env.SMTP_AUTH_PASSWORD
		}
	},
	jwt: {
		secretKey: process.env.JWT_SECRET
	},
	multer: {
		storagePath: process.env.FILE_PATH
	},
	iyzicoConfig: {
		apiKey: process.env.IYZIPAY_API_KEY,
		secretKey: process.env.IYZIPAY_SECRET_KEY,
		uri: process.env.IYZIPAY_URI
	}
};
