const Collect = require('../models/collectModel')
const Business =require('../models/businessModel')
const createError = require('http-errors')


function createCollect(data) {
    const date = new Date()
    const nowDate = date.toLocaleString()
    //Sun Apr 03 2022 A toDateString
    //3/18/2021, 8:00 B toLocaleString
    const newCollect = new Collect(data)
    newCollect.creation_date = nowDate

    const waste_amounts  = {
        "plastic_amount": 0,
        "carton_amount": 0,
        "glass_amount": 0,
        "oil_amount": 0,
        "cans_amount": 0,
        "grease_amount": 0
    }

    newCollect.waste_amounts = waste_amounts

    return newCollect.save()
}

function getCollects() {
    return Collect.find()
}

function getCollectById(id){
    return Collect.findById(id)
}

function getCollectByBusinessId(id){
    return Collect.find({business:id})
}


async function updateCollect (idCollect,  data) {
    const collectFound = await Collect.findById(idCollect)
    const {business:businessId} = collectFound
    const businessFound = await Business.findById(businessId)
    
    let {
        business_plastic,
		business_carton,
		business_glass,
		business_oil,
		business_cans,
		business_grease
    } = businessFound.business_wastes_amounts

    business_plastic += data.waste_amounts.plastic_amount
    business_carton += data.waste_amounts.carton_amount
    business_glass += data.waste_amounts.glass_amount
    business_oil += data.waste_amounts.oil_amount
    business_cans += data.waste_amounts.cans_amount
    business_grease += data.waste_amounts.grease_amount
    console.log(business_plastic, business_carton, business_glass, business_oil, business_cans, business_grease)

    const business_wastes_amounts = {
        business_plastic : business_plastic,
        business_carton : business_carton,
        business_glass : business_glass,
        business_oil: business_oil,
        business_cans : business_cans,
        business_grease: business_grease
    }
    
    const findByBusiness = await Business.findByIdAndUpdate(businessId, {$set:{business_wastes_amounts: business_wastes_amounts
    }})
    console.log(findByBusiness)


    console.log(businessFound)
    // business.findByIdAndUpdate(idBusiness, data)
    return Collect.findByIdAndUpdate(idCollect, data, {new:true})
}

function deleteCollectById(id){
    return Collect.findByIdAndDelete(id)
}


module.exports = {
    getCollects,
    createCollect,
    getCollectById,
    deleteCollectById,
    updateCollect,
    getCollectByBusinessId
}