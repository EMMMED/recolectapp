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

module.exports = router