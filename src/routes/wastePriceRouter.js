const wastePrice = require('../usecases/wastePriceUsecase')
const user = require('../usecases/userUsecase')
const express = require('express')
const createError = require('http-errors')

const router = express.Router()

router.get('/', async(request,  response)=>{
    try {
        const getWastePrices = await wastePrice.getWastePrices()
        response.json({
            ok: true, 
            message: getWastePrices
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            message: 'Cant get the waste price list'
        })
    }
})

router.post('/', async(request, response) => {
    try {
        const newWastePriceList = await wastePrice.createWastePrice()
        response.json({
            ok:true, 
            message: newWastePriceList
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false, 
            message: 'Cant create a new waste price list'
        })
        
    }
})

router.patch('/:id', async(request, response) => {
    try {
        const updatePriceList = await wastePrice.updateWastePrice(request.params.id, request.body)
        response.json({
            ok: true, 
            message: updatePriceList
        })
    } catch (error) {
        response.status(400),
        response.json({
            ok: false, 
            message: 'Cand update de waste price list'
        })
    }
})

module.exports = router