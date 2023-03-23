const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const jsonParse = bodyParser.json();

app.use(express.static('public'))

app.listen(port, (error) => {
	if (!error) {
		console.log(`Server running on port ${port}`);
	}
	else {
		console.log("Error occurred starting server.", error);
	}
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/html/index.html'));
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
			res.status(500).send(`An error occurred while sending the email: ${info.response}`);
		} else {
			res.status(200).send("Email sent");
		}
	});
});