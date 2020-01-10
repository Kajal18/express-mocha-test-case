const jsonFile = require('jsonfile')

const writeToFile = (file, data) => {
    jsonFile.writeFile(file, data, { spaces: 2 }, function (err) {
        if (err) console.error(err)
    })
}

module.exports = writeToFile