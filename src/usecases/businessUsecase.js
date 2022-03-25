const businessSchema = require('../models/businessModel')
const Business = require('../models/businessModel')
const createError = require('http-errors')

function probando(){
    console.log('estamos probando')
}

function createBusiness(data) {
    const newBusiness = new Business(data)
    user: user._id
    const error = newBusiness.validateSync()
    if(error){
        console.error(error)
        throw new errorhttp(400, 'validation failed')
    }
    return newBusiness.save()
}

module.exports = {createBusiness}