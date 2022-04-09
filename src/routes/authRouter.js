const express = require('express')

const createError = require('http-errors')

const User = require('../usecases/userUsecase')
const router = express.Router()

router.post('/login', async(request, response)=> {
    try {
        const {user_mail, user_password} = request.body

        if(!user_mail) throw new createError(400, 'Email is required')
        if(!user_password) throw new createError(400, 'Password is required')

        const token = await User.login(user_mail, user_password)
        console.log(token);
        response.json({
            ok:true,
            message: token
        })
    } catch (error) {
        response.status(error.status, 500)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

module.exports = router