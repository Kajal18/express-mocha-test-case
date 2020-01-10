const Excel = require('exceljs')
const path = require('path')
const _ = require('lodash')

const importFile = async (req, res, next) => {
    const fileLocation = req.file.path
    var workbook = new Excel.Workbook();
    let a = []
    workbook.xlsx.readFile(fileLocation).then(function () {
        var worksheet = workbook.getWorksheet('Analysis');
        alphabet = 'BCDEFGHIJKLM'.split('');
        for (let letter of alphabet) {
            const col = worksheet.getColumn(letter).values
            col.forEach((ele, i) => {
                let obj = {
                    quater: col[2],
                    month: col[3]
                }
                if (_.isObject(ele)) {
                    if (!ele.result) {
                        obj.result = ele.formula
                    }
                    else {
                        obj.result = ele.result
                    }
                }
                a.push(obj)
            })
        }
        let b = []
        const colA = worksheet.getColumn('A').values
        a.map((d, i) => {
            colA.map((e, j) => {
                d.department = colA[j]
            })
            console.log(d)
        })
        // a[i].department = colA[j]
    }).catch(err => console.log(err))
}

module.exports = importFile