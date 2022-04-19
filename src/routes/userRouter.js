const user = require('../usecases/userUsecase')
const express = require('express')
const mongoose = require('mongoose')
const createError = require('http-errors')

const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

// router.use(authMiddleware)

router.post('/', async(request, response) => {
    try {
        const newUSer = await user.createUser(request.body)
        response.json({
            status: true,
            message: 'User Created',
            newUser: newUSer
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message  
        })
    }
})

router.get('/', async(request, response)=>{
    try {
        const userAll = await user.getAllUser()
        response.json({
            ok: true,
            message: 'Mostrando todos los usuarios',
            userAll: userAll
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message
        })
    }
})


router.get('/:id', async(request, response)=>{
    try {
        const bussinesByUser = await user.bussinesByUser(request.params.id)
        response.json({
            message: bussinesByUser
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
        const getUserById = await user.getByIdUser(request.params.id)
        response.jsonp({
            ok: true,
            message: 'Mostrando usuario',
            userById: getUserById
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
    const deleteUserById = await user.deleteUserById(request.params.id)
    response.json({
        ok:true,
        message: 'Usuario Eliminado',
        deleteUserById : deleteUserById
    })
} catch (error) {
    response.status(400)
    response.json({
        ok: false,
        message: error.message
    })
}
})

router.patch('/:id', async(request, response) => {
    try {
        const updateUser = await user.updateUserById(request.params.id, request.body)
        response.json({
            ok: true,
            message: 'User updated',
            updateUser: updateUser
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok:false, 
            message: error.message
        })
    }
})

module.exports = router