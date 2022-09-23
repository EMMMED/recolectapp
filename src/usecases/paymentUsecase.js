const Payment = require('../models/paymentModel')

function getAllPaymentMethods() {
  return Payment.find()
}

function getPaymentMethodByUserId(id) {
  return Payment.find({ user: id })
}

function createPaymentMethod(data) {
  const newPaymentMethod = new Payment(data)
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

