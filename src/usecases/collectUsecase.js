const Collect = require('../models/collectModel')
const createError = require('http-errors')

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
    createCollect
}