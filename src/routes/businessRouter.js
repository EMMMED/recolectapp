const business = require('../usecases/businessUsecase')
const express = require('express')
const createError = require('http-errors')

const router = express.Router()

router.post('/', async(request, response) => {
    try {
        const newBusiness = await business.createBusiness(request.body)
        response.json({
            status : true,
            message: 'Business Created',
            newBusiness: newBusiness
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message  
        })
    }
})

router.get('/', async(request,  response)=>{
    console.log(request.query)
    const {user} = request.query

    try {
        let getBussines 
        if(!user){
            getBussines = await business.getBussines()
        } else if(!!user){
            getBussines = await business.getBusinessByClientId(user)
        }
        response.json({
            ok: true, 
            message: getBussines
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message  
        })
    }
})

router.get('/:id', async(request, response) => {
    try {
        const getBusinessById = await business.getBusinessByBusinessId(request.params.id)
        response.json({
            ok: true,
            message: 'Get Business by id completed',
            getBusinessById: getBusinessById
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            message: error.message
        })
    }
})

router.patch('/:id', async( request, response ) => {
    try {
        const updateBusiness = await business.updateBusiness(request.params.id, request.body)
        response.json({
            ok: true, 
            message: 'Business updated',
            updateBusiness: updateBusiness
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
        const deleteBusinessById = await business.deleteBusiness(request.params.id)
        response.json({
            ok: true,
            message: 'Business Deleted',
            deleteBusinessById: deleteBusinessById
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

module.exports = router