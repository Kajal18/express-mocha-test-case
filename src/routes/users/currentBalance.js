const jsonFile = require('jsonfile')
const userFile = __dirname + '/../../data/user.json'

const currentBalance = async (req, res, next) => {
    try {
        const { user } = req
        return res.status(200).json({
            currentBalance: user.balance
        })
    } catch (err) {
        return next(err)
    }
}

module.exports = currentBalance