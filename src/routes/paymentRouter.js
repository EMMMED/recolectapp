const payment = require('../usecases/paymentUsecase')
const express = require('express')
const createError = require('http-errors')

const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.use(authMiddleware)

router.get('/', async(request, response) => {
    console.log(request.query)
    const {user} = request.query
    try {
        let getPayments
        if(!user){
            getPayments = await payment.getAllPaymentMethods()
        }else if (!!user) {
            getPayments = await payment.getPaymentMethodByUserId(user)
        }
        response.json({
            ok:true,
            message: getPayments
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message
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
        response.status(400)
        response.json({
            ok : false,
            message : error.message
        })
    }
})

router.patch( '/:id', async( request, response ) => {
    try {
        const paymentMethodUpdate = await payment.updatePaymentMethod(request.params.id, request.body)
        response.json({
            ok: true,
            mesage: 'Payment method updated',
            paymentMethodUpdate: paymentMethodUpdate
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            message: error.message
        })
    }
})

router.delete('/:id', async(request, response) => {
    try {
        const paymentMethodDeleted = await payment.deletePaymentMethod(request.params.id)
        response.json({
            ok:true,
            message: 'Payment method deleted',
            paymentMethodDeleted : paymentMethodDeleted
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            message: error.message
        })
    }
})

module.exports = router