const Collect = require('../models/collectModel')
const Business =require('../models/businessModel')
const createError = require('http-errors')

function getCollects() {
    return Collect.find()
}

function GetCollectsByBusinessId(id) {
    return Collect.findById(id).populate({path:'business', select: 'business'})
}

function createCollect(data) {
    const newCollect = new Collect(data)
    // const error = newCollect.validateSync()
    // if( error ) {
    //     console.log( error )
    //     throw new error(400, 'validation failed')
    // }
    return newCollect.save()
}

module.exports = {
    getCollects,
    createCollect,
    GetCollectsByBusinessId
}