const Payment = require('../models/paymentModel')
const User = require('../models/userModel')
const createError = require('http-errors')

function getAllPaymentMethods() {
    return Payment.find() 
}

function createPaymentMethod() {
    const newPaymentMethod = new Payment(data)
    return newPaymentMethod.save()
}

module.exports = {
    getAllPaymentMethods,
    createPaymentMethod
}

