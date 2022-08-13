const newsletter = require('../usecases/newsletteUsecase')
const express = require('express')

const router = express.Router()

router.post('/', async(request,response)=>{
    try {
        const newletter = await newsletter.newPost(request.body)
        response.json({
            ok: true,
            message: 'New Post',
            newletter: newletter
        }) 
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            error: error.message
        })
    }
})

router.get('/', async(request, response)=>{
    try {
        const getNewletter = await newsletter.getNewletter()
        response.json({
            ok: true,
            message: 'Get Newsletter',
            getNewletter: getNewletter
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: true,
            error: error.message
        })
    }
})

router.get('/:id', async(request, response)=>{
    try {
        const getNewletter = await newsletter.getNewletterById(request.params.id)
        response.json({
            ok: true,
            message: 'Get Newsletter By Id',
            getNewletter: getNewletter
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: true,
            error: error.message
        })
    }
})

router.patch('/:id', async (request, response)=>{
    try {
        const updateNewletter = await newsletter.updateNewletter(request.params.id, request.body)
        response.json({
            ok: true,
            message: 'Informacion Actualizada',
            updateNewletter: updateNewletter
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            error: error.message
        })
    }
})

router.delete('/:id', async(request, response)=>{
    try {
        const deleteNewsletter = await newsletter.deleteNewletter(request.params.id)
        if(!deleteNewsletter){
            response.status(404)
            response.json({
                ok:false,
                message: 'Datos no existen'
            })
            return;
        }
        response.json({
            ok:true,
            message:'Informacion eliminada',
            deleteNewsletter:deleteNewsletter
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            error:error.message
        })
    }
})
module.exports = router