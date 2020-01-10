const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const dotenv = require('dotenv');
const app = express()
app.use(bodyParser.json())
dotenv.config();

app.use(routes)
// app.use(middleware)
app.listen(4000, () => {
    console.log("Server running on 4000 port")
})

module.exports = app