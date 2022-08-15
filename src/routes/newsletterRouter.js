const newsletter = require('../usecases/newsletterUsecase')
const express = require('express')

const router = express.Router()

router.get('/', async(request, response)=>{
    try {
        const getnewsletterAll = await newsletter.getnewsletterAll()
        response.json(getnewsletterAll)
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            error: error.message
        })
    }
})

router.get('/:id', async (request, response)=>{
    try {
        const getnewsletterId = await newsletter.getnewsletterId(request.params.id)
        response.json(getnewsletterId)
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            error: error.message
        })
    }
})

module.exports = router