const Business = require('../models/businessModel')
const User = require('../models/userModel')
const userCase = require('../usecases/userUsecase')
const createError = require('http-errors')


async function createBusiness(data) {
    const newBusiness = new Business(data)

    console.log("esta es la data", data)
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
        throw new createError(400, error)
    }

    console.log(data.user);
    const businessId = newBusiness._id 
    const userFound = await userCase.getByIdUser(data.user)
    userFound.business.push(businessId)
    const updateBussinesList = await User.findByIdAndUpdate(data.user, userFound)
    newBusiness.save()
    return (
        updateBussinesList,
        newBusiness
    )

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

async function deleteBusiness(id){ 
    const bussines = await getBusinessByBusinessId(id)
    const userFound = await User.findById(bussines.user)
    
    if (bussines.collect.length > 0) throw new createError(400)

    const newList = userFound.business.filter(item => item != id)

    const updateBussines = await User.findByIdAndUpdate(bussines.user , {business: newList})
    const deleteBussines = Business.findByIdAndDelete(id)
    
    return(
        updateBussines,
        deleteBussines
    )
}

module.exports = {
    createBusiness,
    getBussines,
    getBusinessByClientId,
    getBusinessByBusinessId,
    updateBusiness,
    deleteBusiness
}