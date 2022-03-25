const user = require('../usecases/userUsecase')
const express = require('express')
const createError = require('http-errors')

const router = express.Router()

router.post('/', async(request, response) => {
    const newUSer = await user.createUser(request.body)
    response.json({
        status: true,
        message: 'User Created',
        newUser: newUSer
    })
})

module.exports = router