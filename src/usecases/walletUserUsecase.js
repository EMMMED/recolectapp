const WalletUser = require('../models/walletUserModel')
const createHTTPError = require('http-errors')

function createWalletUser(idUser) {
  const newWallet = new WalletUser({ user: idUser })
  return newWallet.save()
}

function getWalletUser(id) {
  return WalletUser.findById(id).populate('user')
}

function getAllWallets() {
  return WalletUser.find()
}

function getWalletByUserID(id) {
  return WalletUser.find({ user: id })
}

function deleteWallet(id) {
  const wallet = WalletUser.findById(id)
  if (!wallet) {
    throw new createHTTPError(404, 'Wallet no existe')
  }
  return WalletUser.findByIdAndDelete(id)
}


module.exports = {
  getAllWallets,
  getWalletUser,
  getWalletByUserID,
  createWalletUser
}