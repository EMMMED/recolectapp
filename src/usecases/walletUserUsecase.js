const WalletUser = require('../models/walletUserModel')
const Business = require('../models/businessModel')
const User = require('../models/userModel')

function createWalletUser(idUser) {
    const newWallet = new WalletUser({user : idUser})
    console.log(newWallet)
    return newWallet.save()
}

function getWalletUser(id) {
    return WalletUser.findById(id).populate('user')
}

function getAllWallets(){
    return WalletUser.find()
}

function getWalletByUserIDd(id){
    return WalletUser.find({user:id})
}

function updateWalletUser(id, data) {
    return WalletUser.findByIdAndUpdate(id, data, {new:true})
}

function deleteWalletUser(id) {
    return WalletUser.findByIdAndDelete(id)
}

module.exports = {
    getAllWallets,
    getWalletUser,
    getWalletByUserIDd,
    createWalletUser,
    updateWalletUser,
    deleteWalletUser
}