const express = require('express')
const WalletUser = require('../usecases/walletUserUsecase')
const User = require('../usecases/userUsecase')
const Business = require('../usecases/businessUsecase')

const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

// router.use(authMiddleware)

router.get('/:id', async (request, response) => {
    try {
        const getWalletUser = await WalletUser.getWalletUser()
        response.json({
            status: true,
            message: getWalletUser
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: 'Cant get the wallet'
        })
    }
})


router.get('/', async (request, response) => {
    console.log(request.query)
    const { user } = request.query

    try {
        let getWallet
        if (!user) {
            getWallet = await WalletUser.getAllWallets()
        } else if (!!user) {
            getWallet = await WalletUser.getWalletByUserIDd(user)
        }
        response.json({
            ok: true,
            message: getWallet
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
        const newWallet = await WalletUser.createWalletUser(userId)
        response.json({
            status: true,
            message: newWallet
        })
    } catch (error) {
        response.status(400)
        response.json({
            status: false,
            message: 'The wallet cant be created'
        })
    }
})



module.exports = router