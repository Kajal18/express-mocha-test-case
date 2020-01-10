const jsonFile = require('jsonfile')
const _ = require('lodash')
const userFile = __dirname + '/../../data/user.json'
const writeToFile = require('../writeToFile')

const recharge = async (req, res, next) => {
    try {
        const { body, user } = req
        const userInstance = await jsonFile.readFile(userFile)
        const userIndex = _.findIndex(userInstance, (o) => o.email === user.email)
        user.balance >= 0 && body.amount ? user.balance = user.balance + body.amount : user.balance
        userInstance[userIndex] = user
        await writeToFile(userFile, userInstance)
        return res.status(200).json({
            status: 'SUCCESS',
            message: 'Recharged successfully',
            totalBalance: user.balance
        })
    } catch (err) {
        return next(err)
    }
}

module.exports = recharge