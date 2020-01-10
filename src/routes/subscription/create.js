const jsonFile = require('jsonfile')
const userFile = __dirname + '/../../data/user.json'
const _ = require('lodash')
const satTvService = require('../../data/packs')
const moment = require('moment')
const writeToFile = require('../writeToFile')
const userSubscriptionMail = require('../email/methods/user-subscription')
const sendSms = require('../sms/sendSms')

const create = async (req, res, next) => {
    try {
        const { body, user } = req
        let balanceToSave
        if (!body.serviceType) {
            throw new Error('Subscription package is required')
        }
        if (!body.serviceName) {
            throw new Error('Subscription package name is required')
        }
        if (!satTvService[body.serviceType]) {
            throw new Error('Invalid Subscription package')
        }
        const userInstance = await jsonFile.readFile(userFile)
        const userIndex = _.findIndex(userInstance, (o) => o.name === user.name)
        let checkService = satTvService[body.serviceType].find(o => o.isAvailable === true && o.name === body.serviceName)
        if (!checkService) {
            throw new Error('Subscribing service not available')
        }
        if (user.balance < checkService.amount) {
            throw new Error('Insufficient account balance')
        }
        !body.duration ? checkService.duration = 1 : checkService.duration = body.duration
        if (checkService.duration >= 3) {
            balanceToSave = ((checkService.amount) - (checkService.amount * 0.1)) * checkService.duration
            checkService.discountPercent = 10
        } else {
            balanceToSave = (checkService.amount) * checkService.duration
            checkService.discountPercent = 0
        }
        checkService.subscribedOn = moment().format('YYYY-MM-DD HH:mm:ss a')
        user.balance = user.balance - balanceToSave
        user.subscribed = true
        user.subscriptionDetails ? user.subscriptionDetails.push(checkService) : user.subscriptionDetails = [checkService]
        userInstance[userIndex] = user
        await writeToFile(userFile, userInstance)
        await userSubscriptionMail(user, checkService)
        await sendSms(user, checkService)
        return res.status(200).json({
            status: 'SUCCESS',
            message: 'Subscribed successfully'
        })
    } catch (err) {
        return next(err)
    }
}
module.exports = create