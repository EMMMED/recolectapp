const wasteprice = require('../usecases/wastepriceUsecase')
const express = require('express')

const router = express.Router()

router.get('/', async(request, response)=>{
    try {
        const getwatepriceAll = await wasteprice.getwastepriceAll()
        response.json(getwatepriceAll)
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            error:error.message
        })
    }
})

router.get('/:id', async(request, response)=>{
    try {
        const getwastepriceID = await wasteprice.getwastepriceID(request.params.id)
        response.json(getwastepriceID)
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            error:error.message
        })
    }
})
module.exports = router