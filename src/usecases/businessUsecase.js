const Business = require('../models/businessModel')
const createError = require('http-errors')

function probando(){
    console.log('estamos probando')
}

function createBusiness(data) {
    const newBusiness = new Business(data)
    const error = newBusiness.validateSync()
    if(error){
        console.error(error)
        throw new errorhttp(400, 'validation failed')
    }
    return newBusiness.save()
}

function getBussines(){
    return Business.find()
}

function userByBussnies(id){
    return Business.findById(id).populate('user')
}


module.exports = {
    createBusiness,
    getBussines,
    userByBussnies
}