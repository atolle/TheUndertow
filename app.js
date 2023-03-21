const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const jsonParse = bodyParser.json();

app.use(express.static('dist'))

app.listen(port, (error) => {
	if (!error) {
		console.log(`Server running on port ${port}`);
	}
	else {
		console.log("Error occurred starting server.", error);
	}
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/html/index.html'));
});

app.post('/contact', jsonParse, (req, res) => {
	const { name, email, message } = req.body;
	
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'theundertowmailer@gmail.com',
			pass: 'fbeskbzbnczomjqx'
		}
	});

	var mailOptions = {
		from: 'theundertowmailer@gmail.com',
		to: 'theundertowtheband@gmail.com',
		subject: `Contact Form - ${name} - ${email}`,
		text: message
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
});