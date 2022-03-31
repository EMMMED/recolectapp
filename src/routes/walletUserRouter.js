const express = require('express')
const WalletUser = require('../usecases/walletUserUsecase')
const User = require('../usecases/userUsecase')
const Business = require('../usecases/businessUsecase')


const router = express.Router()

router.get('/:id', async(request, response) => {
    try {
        const getWalletUser = await WalletUser.getWalletUser()
        response.json({
            status: true, 
            message: getWalletUser
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            message: 'Cant get the wallet'
        })
    }

    router.post('/', async(request, response) => {
        try {
            const newWallet = await WalletUser.createWalletUser(request.body)
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
})

module.exports = router