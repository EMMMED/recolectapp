const wastePrice = require('../usecases/wastePriceUsecase')
const user = require('../usecases/userUsecase')
const express = require('express')
const createError = require('http-errors')

const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.use(authMiddleware)

router.get('/', async(request,  response)=>{
    try {
        const getWastePrices = await wastePrice.getWastePrice()
        response.json({
            ok: true, 
            message: 'get wastes',
            getWastePrices: getWastePrices
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            message: error.message
        })
    }
})

router.post('/', async(request, response) => {
    try {
        const newWastePriceList = await wastePrice.createWastePrice()
        response.json({
            ok:true, 
            message: 'Created waste',
            newWastePriceList:  newWastePriceList
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false, 
            message: error.message
        })
        
    }
})

router.patch('/:id', async(request, response) => {
    try {
        const updatePriceList = await wastePrice.updateWastePrice(request.params.id, request.body)
        response.json({
            ok: true, 
            message: 'Updated waste',
            updatePriceList: updatePriceList
        })
    } catch (error) {
        response.status(400),
        response.json({
            ok: false, 
            message: error.message
        })
    }
})

router.delete('/:id', async( request, response) => {
    try {
        const deleteWastePrice = await wastePrice.deleteWastePrice(request.params.id)
        response.json({
            ok: true, 
            message: 'Waste price deleted',
            deleteWastePrice: deleteWastePrice
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