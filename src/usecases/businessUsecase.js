const Business = require('../models/businessModel')
const User = require('../models/userModel')
const createError = require('http-errors')

function probando(){
    console.log('estamos probando')
}

function updateBusinessList(data, id){
    const userId = User.findById(id)
    const updateByUser = Business.findByIdAndUpdate(data, id)
    

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