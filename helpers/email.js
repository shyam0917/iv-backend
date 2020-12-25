const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const config = require('../config');

let SOURCE_EMAIL = 'shyam1709saini@gmail.com';


module.exports.sendMail = async (data) => {
	if (!data['html']) {
		let currentPath = path.join(__dirname, '..', 'templates', 'email');
		var templatePath = path.join(__dirname, '..', 'templates', 'email', data.template + '.ejs');
		var templateHtml = fs.readFileSync(templatePath, 'utf-8');
		data.html = ejs.render(templateHtml, data);
	}

	let fromEmail = `<${SOURCE_EMAIL}>`;
	let transporter = nodemailer.createTransport(config.smtp);
	let mailOptions = {
		from: fromEmail,
		to: data.to,
		subject: data.subject,
		html: data.html
	};

	if (data.cc) {
		mailOptions.cc = data.cc;
	}
	if (data.bcc) {
		mailOptions.bcc = data.bcc;
	}
	// send mail with defined transport object
	return await transporter.sendMail(mailOptions);
};
