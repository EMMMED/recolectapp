const Business = require('../models/businessModel')
const User = require('../models/userModel')
const createError = require('http-errors')



function createBusiness(data) {
    const newBusiness = new Business(data)

    let business_wastes_amounts  = {
        "business_plastic": 0,
        "business_carton": 0,
        "business_glass": 0,
        "business_oil": 0,
        "business_cans": 0,
        "business_grease": 0
    }

    newBusiness.business_wastes_amounts = business_wastes_amounts

    const error = newBusiness.validateSync()
    if(error){
        console.error(error)
        throw new createError(400, 'validation failed')
    }
    return newBusiness.save()
}

function getBussines(){
    return Business.find()
}

function getBusinessByBusinessId(id){
    const businessFound = Business.findById(id)
    if(!businessFound){
        throw new createError(404, 'Cant get business by Id')
    }
    return businessFound
}

function getBusinessByClientId(id){
    console.log(id)
    return Business.find({user:id})
}


function updateBusiness(id, data){
    return Business.findByIdAndUpdate(id, data, {new:true})
}

function deleteBusiness(id){
    return Business.findByIdAndDelete(id)
}

module.exports = {
    createBusiness,
    getBussines,
    getBusinessByClientId,
    getBusinessByBusinessId,
    updateBusiness,
    deleteBusiness
}