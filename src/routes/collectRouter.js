const collect = require('../usecases/collectUsecase')
const express = require('express')
const createError = require('http-errors')

const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.get('/', async(request,  response)=>{
    console.log(request.query)
    const {business} = request.query

    try {
        let getCollect 
        if(!business){
            getCollect = await collect.getCollects()
        } else if(!!business){
            getCollect = await collect.getCollectByBusinessId(business)
        }
        response.json({
            ok: true, 
            message: getCollect
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message  
        })
    }
})


router.get('/:id', async(request,  response)=>{
    try {
        const getCollectById = await collect.getCollectById(request.params.id)
        console.log(collect.waste_amount)
        response.json({
            ok: true, 
            message:'get collects by id',
            getCollectById: getCollectById
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
    try {
        const newCollect = await collect.createCollect(request.body)
        console.log(request.body.waste_amount)
        response.json( {
            status: true,
            message : 'Collect Created',
            newCollect: newCollect
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
        const updateCollect = await collect.updateCollect(request.params.id, request.body)
        response.json({
            ok: true,
            message: 'Collect updated',
            updateCollect: updateCollect
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.delete('/:id', async(request, response) => {
    try {
        const deleteCollectById = await collect.deleteCollectById(request.params.id)
        response.json({
            ok: true,
            message: 'Collect Deleted',
            deleteCollectById: deleteCollectById
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