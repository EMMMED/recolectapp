const WalletUser = require('../models/walletUserModel')

function createWalletUser(idUser) {
    const newWallet = new WalletUser({user : idUser})
    return newWallet.save()
}

function getWalletUser(id) {
    return WalletUser.findById(id).populate('user')
}

function getAllWallets(){
    return WalletUser.find()
}

function getWalletByUserID(id){
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
    getWalletByUserID,
    createWalletUser,
    updateWalletUser,
    deleteWalletUser
}