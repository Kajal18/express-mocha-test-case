const jwt = require('jsonwebtoken');
const jsonFile = require('jsonfile')
const userFile = __dirname + '/../data/user.json'

module.exports = {
    validateToken: async (req, res, next) => {
        const authorizationHeaader = req.headers.authorization;
        let result;
        if (authorizationHeaader) {
            const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            const options = {
                expiresIn: '1d',
            };
            try {
                result = jwt.verify(token, 'secretjwt', options);
                const userInstance = await jsonFile.readFile(userFile)
                let user = userInstance.find(o => o.email === result.email)
                if (!user) {
                    result = {
                        error: `Something went wrong.`,
                        status: 400
                    };
                }
                req.user = user;
                next();
            } catch (err) {
                console.log(err)
                throw new Error(err);
            }
        } else {
            result = {
                error: `Authentication error. Token required.`,
                status: 401
            };
            res.status(401).send(result);
        }
    }
};