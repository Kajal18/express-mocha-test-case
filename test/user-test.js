const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const expect = chai.expect
chai.use(chaiHttp)

const userCredential = { name: "pheobe", email: "pheobe@gmail.com", phoneNumber: 9865321470 }

describe('Create User', function () {
    it('create user', function (done) {
        chai.request(server).post('/user/create')
            .send(userCredential)
            .end(function (err, res) {
                res.should.be.json
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('balance')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('phoneNumber')
                res.status.should.equal(200)
                done()
            })
    })
})

describe('User Api', function () {

    let token = ''
    before(function (done) {
        chai.request(server)
            .post('/login')
            .send({ email: userCredential.email })
            .end(function (err, res) {
                res.status.should.be.equal(200)
                token = res.body.acess_token
                done()
            })
    })

    it('should get a valid token for user and check current balance', function (done) {
        chai.request(server).get('/user/currentBalance')
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                res.should.be.json
                expect(res.body).to.have.property('currentBalance')
                res.status.should.equal(200)
                done()
            })
    })

    it('should get a valid token for user and recharge account', function (done) {
        chai.request(server).post('/user/recharge')
            .set('Authorization', 'Bearer ' + token)
            .send({ amount: 500 })
            .end(function (err, res) {
                res.should.be.json
                expect(res.body).to.have.property('totalBalance')
                res.status.should.equal(200)
                done()
            })
    })

    it('should get a valid token for user and update email or phone number', function (done) {
        chai.request(server).post('/user/update')
            .set('Authorization', 'Bearer ' + token)
            .send({ email: 'ross@yopmail.com' })
            .end(function (err, res) {
                res.status.should.equal(200)
                done()
            })
    })

    it('should get a valid token for user and subscribe', function (done) {
        chai.request(server).post('/subscription/create')
            .set('Authorization', 'Bearer ' + token)
            .send({ serviceType: "channels", serviceName: "Zee" })
            .end(function (err, res) {
                console.log(token)
                res.should.be.json
                res.status.should.equal(200)
                done()
            })
    })
})