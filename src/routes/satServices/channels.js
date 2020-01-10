const _ = require('lodash')
const satTvService = require('../../data/packs')

const channelsList = async (req, res, next) => {
    const { query } = req
    let available
    if (query.list === 'packs') {
        available = satTvService.packs.filter((o) => o.isAvailable === true)
    }
    if (query.list === 'channels') {
        available = satTvService.channels.filter((o) => o.isAvailable === true)
    }
    if (query.list === 'services') {
        available = satTvService.services.filter((o) => o.isAvailable === true)
    }
    return res.status(200).json(available)
}

module.exports = channelsList