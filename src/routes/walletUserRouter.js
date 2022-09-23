const express = require('express')
const walletUser = require('../usecases/walletUserUsecase')

const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

// router.use(authMiddleware)

router.get('/:id', authMiddleware, async (request, response) => {
  try {
    const getWalletUser = await walletUser.getWalletUser()
    response.json({
      status: true,
      message: 'Wallet por id',
      getWalletUser: getWalletUser
    })
  } catch (error) {
    response.status(400)
    response.json({
      ok: false,
      message: error.message
    })
  }
})


router.get('/', async (request, response) => {
  const { user } = request.query
  let message

  try {
    let getWallet
    if (!user) {
      getWallet = await walletUser.getAllWallets()
      message='Todos los wallets'
    } else if (!!user) {
      getWallet = await walletUser.getWalletByUserID(user)
      message='Wallet por usuario'
    }
    response.json({
      ok: true,
      message: message,
      getWallet: getWallet
    })
  } catch (error) {
    response.status(400)
    response.json({
      ok: false,
      message: error.message
    })
  }
})

router.post('/', async (request, response) => {
  try {
    const newWallet = await walletUser.createWalletUser(userId)
    response.json({
      status: true,
      message: 'Nuevo Wallet',
      newWallet: newWallet
    })
  } catch (error) {
    response.status(400)
    response.json({
      status: false,
      message: error.message
    })
  }
})



module.exports = router