const jsonFile = require('jsonfile')
const userFile = __dirname + '/../../data/user.json'
const satTvService = require('../../data/packs')
const writeToFile = require('../writeToFile')
const sendSms = require('../sms/sendSms')

const list = async (req, res, next) => {
    const { user } = req
    const { subscriptionDetails } = user
    return res.status(200).json(subscriptionDetails)

}
module.exports = list