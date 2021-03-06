const WastePrice = require('../models/wastePriceModel')
const User = require('../models/userModel')
const createError = require('http-errors')

function createWastePrice(){
    const data = {
        'plastic_price': 2,
        'carton_price' : 5,
        'glass_price' : 3,
        'oil_price' : 10,
        'cans_price' : 10,
        'grease_price': 20
    }
    const newWastePriceList = new WastePrice(data)
    return newWastePriceList.save()
}

function getWastePrice() {
    return WastePrice.find()
}

function updateWastePrice(id, data){
    return WastePrice.findByIdAndUpdate(id, data, {new:true}) 
}

function deleteWastePrice(id) {
    return WastePrice.findByIdAndDelete(id)
}

module.exports = {
    getWastePrice,
    createWastePrice,
    updateWastePrice,
    deleteWastePrice
}
