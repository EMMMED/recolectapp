const collect = require('../usecases/collectUsecase')
const express = require('express')
const createError = require('http-errors')
const { response } = require('express')

const router = express.Router()

router.post('/', async(request, response) => {
    const newCollect = await collect.createCollect(request.body)
    response.json( {
        status: true,
        message : 'Collect Created',
        newCollect: newCollect
    })
})


module.exports = router