const nodemailer = require('nodemailer');
const userSubscription = async (data, service) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.ethereal.email',
        port: 587,
        secure: true,
        auth: {
            user: 'mitchel67@ethereal.email',
            pass: '7pqRkRcRtCQaKRQAXA'
        }
    });

    var mailOptions = {
        from: 'mitchel67@ethereal.email',
        to: data.email,
        subject: 'Subscription Activated',
        html: `<h1>Welcome</h1><p>to satTv!, your ${service.name} subscription worth ${service.amount} has been started for ${service.duration}</p>`
    };
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
        transporter.close();
    });
}
module.exports = userSubscription