const collect = require('../usecases/collectUsecase')
const express = require('express')
const createError = require('http-errors')

const router = express.Router()

router.get('/', async(request,  response)=>{
    try {
        const getAllCollects = await collect.getCollects()
        response.json({
            ok: true, 
            message:'Mostrando todas las recolecciones',
            getAllCollects: getAllCollects
        })
    } catch (error) {
        
    }
})

router.get('/:id', async(request, response)=>{
    try {
        const collectsByBusinessID = await collect.GetCollectsByBusinessId(request.params.id)
        response.json({
            ok: true,
            message: 'mostrando recolecciones por negocio',
            collectsByBusinessID: collectsByBusinessID
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
    const newCollect = await collect.createCollect(request.body)
    response.json( {
        status: true,
        message : 'Collect Created',
        newCollect: newCollect
    })
})


module.exports = router