const express = require('express')
const createError = require('http-errors')
const user = require('../usecases/userUsecase')
const router = express.Router()

router.post('/login', async (request, response) => {
  try {
    const { user_mail, user_password } = request.body

    if (!user_mail) throw new createError(400, 'Correo es requerido')
    if (!user_password) throw new createError(400, 'Contraseña es requerido')

    const data = await user.login(user_mail, user_password)
    const { token, id } = data
    response.json({
      ok: true,
      message: 'Get data',
      userToken: { token, id }
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