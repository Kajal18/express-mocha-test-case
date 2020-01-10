const express = require('express')
const route = express.Router()
const userMethods = require('./users')
const serviceMethods = require('./satServices')
const subscriptionMethods = require('./subscription')
const excelMethods = require('./excel')
const authentication = require('../middleware/authentication')
const { validateToken } = require('../middleware/validateToken')
const multer = require('multer')
const upload = multer({
    dest: "uploads/",
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});
//user
route.get('/user/currentBalance', validateToken, userMethods.currentBalance)
route.post('/user/create', userMethods.create)
route.post('/user/update', validateToken, userMethods.update)
route.post('/user/recharge', validateToken, userMethods.recharge)

//service, channels, packs
route.get('/satTv/Service', validateToken, serviceMethods.channels)

//subscription
route.post('/subscription/create', validateToken, subscriptionMethods.create)
route.get('/subscription/list', validateToken, subscriptionMethods.list)

route.post('/excel/import', upload.single('file'), excelMethods.importfile)

//login
route.post('/login', authentication)

module.exports = route
