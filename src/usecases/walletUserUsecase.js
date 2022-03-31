const WalletUser = require('../models/walletUserModel')
const Business = require('../models/businessModel')
const User = require('../models/userModel')

function getWalletUser(id) {
    return WalletUser.findById(id).populate('user')
}

function createWalletUser(data) {
    const newWallet = new WalletUser(data)
    return newWallet.save()
}



module.exports = {
    getWalletUser,
    createWalletUser
}