const jsonFile = require('jsonfile')
const userFile = __dirname + '/../../data/user.json'
const writeToFile = require('../writeToFile')

const create = async (req, res, next) => {
    try {
        const { body } = req
        let user = [], userDataToSave
        if (!body.email || !body.name || !body.email) {
            throw new Error('User details are required')
        }
        const userData = await jsonFile.readFile(userFile)
        if (!userData) {
            userDataToSave = {
                name: body.name,
                phoneNumber: body.phoneNumber,
                email: body.email,
                balance: 100,
                subscribed: false
            }
            user.push(userDataToSave)
        }
        else {
            let findData = userData.find(o => o.email === body.email)
            if (!findData) {
                userDataToSave = {
                    name: body.name,
                    phoneNumber: body.phoneNumber,
                    balance: 100,
                    email: body.email,
                    subscribed: false
                }
                userData.push(userDataToSave)
                user.push(...userData)
            }
            else {
                throw new Error('Already member of SatTv, please subscribe our channel')
            }
        }
        await writeToFile(userFile, user)
        return res.status(200).json(userDataToSave)
    } catch (err) {
        return next(err)
    }
}
module.exports = create