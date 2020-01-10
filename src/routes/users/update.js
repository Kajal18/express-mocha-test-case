const jsonFile = require('jsonfile')
const _ = require('lodash')
const userFile = __dirname + '/../../data/user.json'
const writeToFile = require('../writeToFile')

const update = async (req, res, next) => {
    try {
        const { body, user } = req
        const userInstance = await jsonFile.readFile(userFile)
        const userIndex = _.findIndex(userInstance, (o) => o.email === user.email)
        user.email && body.email ? user.email = body.email : user
        user.phoneNumber && body.phoneNumber ? user.phoneNumber = body.phoneNumber : user
        userInstance[userIndex] = user
        await writeToFile(userFile, userInstance)
        return res.status(200).json({
            status: 'SUCCESS',
            message: 'Updated successfully'
        })
    } catch (err) {
        return next(err)
    }
}

module.exports = update