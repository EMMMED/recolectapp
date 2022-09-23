const Business = require("../models/businessModel")
const user = require("../usecases/userUsecase")
const createError = require("http-errors")


async function createBusiness(data) {
  const newBusiness = new Business(data)

  const error = newBusiness.validateSync()
  if (error) {
    throw new createError(400, error)
  }

  const userFound = await user.getByIdUser(data.user)
  userFound.business.push(newBusiness._id)
  await user.updateUserById(data.user, userFound)
  newBusiness.save()
  return newBusiness
}

function getBussines() {
  return Business.find()
}

function getBusinessByBusinessId(id) {
  const businessFound = Business.findById(id)
  if (!businessFound) {
    throw new createError(404, "Ningun resultado")
  }
  return businessFound
}

async function getBusinessByClientId(id) {
  const userFound = await user.getByIdUser(id)
  sumaTotalwaste(userFound.business)
  return Business.find({ user: id })
}

function updateBusiness(id, data) {
  return Business.findByIdAndUpdate(id, data, { new: true })
}

async function deleteBusiness(id) {
  const bussines = await getBusinessByBusinessId(id)
  const userFound = await user.getByIdUser(bussines.user)

  if (bussines.collect.length > 0) throw new createError(400)

  const newList = userFound.business.filter((item) => item != id)
  await user.updateUserById(bussines.user, { business: newList })
  const deleteBussines = Business.findByIdAndDelete(id)

  return deleteBussines
}


module.exports = {
  createBusiness,
  getBussines,
  getBusinessByClientId,
  getBusinessByBusinessId,
  updateBusiness,
  deleteBusiness,
}
