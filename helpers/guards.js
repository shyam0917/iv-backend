const jwt = require('jsonwebtoken');
const commonResponse = require('./commonResponse');
const message = require('./message');
var fs = require('fs');
const config = require('../config');
require('dotenv').config();

// const storage =(date)=>{ 
// 	multer.diskStorage({
// 	destination: function (req, file, cb) {
// 	  cb(null, config.multer)
// 	},
// 	filename: function (req, file, cb) {
// 	  cb(null, file.fieldname + '-' + date)
// 	}
//   })
// }

const getImage = (imageUrl) => {
	let buff = new Buffer(imageUrl.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
	let imageName = Date.now() + '.jpg';
	fs.writeFile(`public/images/${imageName}`, buff, function(err){
		if(err){
			return undefined
		}
	});
	return imageName;
};

const createVerifyToken = (userDetails) => {
	const payload = {
		id: userDetails.id,
		role: userDetails.role,
    };
	const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
	payload.token = token;
	return payload;
};

const createUserToken = (userDetails) => {
	const payload = {
		id: userDetails.id,
		role: userDetails.role,
	};
	const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
	payload.token = token;
	return payload;
};

const verifyJWT = (token) =>{
    var tokenResponse = {};
    jwt.verify(token, config.jwt.secretKey, (err, decoded) => {
		if (err) {
			 tokenResponse = {key: 0, message: message.TOKEN_EXPIRED}
        }else{
            tokenResponse = {key:1, payload: decoded} 
        }

    })
    return tokenResponse
}

const isAuthorized = (authorizedTypes) => (req, res, next) => {
	const tokenStatus = verifyJWT(req.headers['authorization']);
	if (tokenStatus.key === 1) {
		sqConn.User.findByPk(tokenStatus.payload.id).then((user)=>{
			if(!user){
				commonResponse.unAuthorized(res, message.USER_NOT_FOUND);
			}else if(authorizedTypes.indexOf(user.role) === -1){
				commonResponse.unAuthorized(res,message.UNAUTHORIZED);
			}
			else if(user.isActive === '0'){
				commonResponse.unAuthorized(res,message.NOT_ACTIVE_USER);
			}else{
				next()
			}
		})
	} else {
		commonResponse.unAuthorized(res,message.INVALID_TOKEN);
	}
};


module.exports = {
	createUserToken,
	createVerifyToken,
    verifyJWT,
	isAuthorized,
	getImage
	// storage
};
