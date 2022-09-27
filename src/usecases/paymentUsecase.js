const Payment = require('../models/paymentModel')
const user = require('../usecases/userUsecase')

function getAllPaymentMethods() {
  return Payment.find()
}

function getPaymentMethodByUserId(id) {
  return Payment.find({ user: id })
}

async function createPaymentMethod(data) {
  const newPaymentMethod = new Payment(data)

  const userFound = await user.getByIdUser(data.user)
  console.log()
  userFound.payment = newPaymentMethod._id
  await user.updateUserById(data.user, {payment: userFound.payment}, {new:true})
  
  return newPaymentMethod.save()
}

function updatePaymentMethod(id, data) {
  return Payment.findByIdAndUpdate(id, data, { new: true })
}

function deletePaymentMethod(id) {
  return Payment.findByIdAndDelete(id)
}

module.exports = {
  getAllPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethodByUserId
}

