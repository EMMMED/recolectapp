const Collect = require("../models/collectModel");
const Business = require("../models/businessModel");
const bussines = require("../usecases/businessUsecase");

const waste_amounts = {
  plastic_amount: 0,
  carton_amount: 0,
  glass_amount: 0,
  oil_amount: 0,
  cans_amount: 0,
  grease_amount: 0,
}

async function createCollect(data) {
  const newCollect = new Collect(data)
  newCollect.waste_amounts = waste_amounts
  newCollect.save()

  const bussinesFound = await bussines.getBusinessByBusinessId(newCollect.business)
  bussinesFound.collect.push(newCollect._id)
  await bussines.updateBusiness(newCollect.business, bussinesFound)

  return newCollect
}

function getCollects() {
  return Collect.find()
}

function getCollectById(id) {
  return Collect.findById(id)
}

function getCollectByBusinessId(id) {
  return Collect.find({ business: id })
}


function deleteCollectById(id) {
  return Collect.findByIdAndDelete(id)
}

module.exports = {
  getCollects,
  createCollect,
  getCollectById,
  deleteCollectById,
  getCollectByBusinessId,
}
