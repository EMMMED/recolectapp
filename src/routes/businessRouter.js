const business = require('../usecases/businessUsecase')
const express = require('express')
const createError = require('http-errors')

const router = express.Router()

router.post('/', async(request, response) => {
    const newBusiness = await business.createBusiness(request.body)
    response.json({
        status : true,
        message: 'Business Created',
        newBusiness: newBusiness
    })
})

router.get('/', async(request,  response)=>{
    try {
        const getBussines = await business.getBussines()
        response.json({
            ok: true, 
            message: getBussines
        })
    } catch (error) {
        
    }
})

router.get('/:id', async(request, response)=>{
    try {
        const userByBussines = await business.userByBussnies(request.params.id)
        response.json({
            ok: true,
            message: 'mostrando negocios por usuario',
            userByBussines: userByBussines
        })
    } catch (error) {
        response.status(400)
        response.jsonp({
            ok: false,
            message: error.message
        })
    }
})

module.exports = router