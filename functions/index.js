const functions = require("firebase-functions");
const nodemailer = require('nodemailer');
const admin = require("firebase-admin");
const cors = require('cors')({origin: '*'});
admin.initializeApp()

exports.sendMail = functions.https.onCall((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    response.set('Access-Control-Allow-Headers', '*');
    response.set('Access-Control-Allow-Headers','Content-Type')
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'rineeshkumar9@gmail.com',
            pass: 'Yamuna@1998'
        }
    });
    // const {to, subject, text } = request.body;
    const mailData = {
        from: 'Rineesh <noreply@firebase.com>',
        to: 'narrarineesh1997@gmail.com',
        subject: "subject",
        text: "text",
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };
    cors()(req, res, () => {
        res.status(200).send({data: { success: true, message: 'yeah!' }})    
      });

    // transporter.sendMail(mailData, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     response.status(200).send({ message: "Mail send", message_id: info.messageId });
    // });
});
exports.helloWorld = functions.https.onCall((request, response) => {
    return cors(req, res, () => {
        res.status(200).send('Hello World!')
    })
  });
