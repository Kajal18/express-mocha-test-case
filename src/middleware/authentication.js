const jwt = require('jsonwebtoken')
const jsonFile = require('jsonfile')
const userFile = __dirname + '/../data/user.json'

const authentication = async (req, res, next) => {
    try {
        let token
        const { body } = req
        if (!body.email) {
            throw new Error('Please provide email')
        }
        const userInstance = await jsonFile.readFile(userFile)
        let user = userInstance.find(o => o.email === body.email)
        if (user) {
            const compare = user.email === body.email ? true : false
            if (compare) {
                token = jwt.sign(body, 'secretjwt', {
                    expiresIn: '1d'
                })
            }
        }
        return res.status(200).json({
            acess_token: token
        })
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = authentication