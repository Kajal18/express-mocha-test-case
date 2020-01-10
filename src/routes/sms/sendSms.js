const Nexmo = require('nexmo');
const sendSms = (user, service) => {
    try {
        const nexmo = new Nexmo({
            apiKey: process.env.API_KEY || "ff91b111",
            apiSecret: process.env.API_SECRET || "aLtH2ZODOJ2H9hNm",
        });
        const from = 'satTv';
        const to = user.phoneNumber;
        const text = `Hello, ${user.name},Welcome to satTv. your subscription for ${service.name} is started for ${service.duration} month for ${service.amount}rs`;
        nexmo.message.sendSms(from, to, text)
    } catch (err) {
        console.log('Error in sending sms')
    }
}

module.exports = sendSms