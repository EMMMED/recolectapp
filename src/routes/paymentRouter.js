const payment = require('../usecases/paymentUsecase')
const express = require('express')
const createError = require('http-errors')

const router = express.Router()

router.get('/' , async(request, response) => {
    try{
    const getAllPaymentMethods = await payment.getAllPaymentMethods()
    response.json({
        ok: true, 
        message: getAllPaymentMethods
        })
    }catch (error) {
        response.json({
            ok:false,
            message:"Get all payment methods failed"
        })
    }
})

router.post('/', async(request, response) => {
    try{
        const newPaymentMethod = await payment.createPaymentMethod(request.body)
        response.json({ 
            status: true, 
            message: newPaymentMethod
        })
    } catch ( error ){
        response.json({
            ok:false,
            message:"Create a new payment methods fail"
        })
    }
})

module.exports = router