const mongoose = require('mongoose')
user = require('../models/userModel')
collect = require('../models/collectModel')

const businessSchema = new mongoose.Schema({

  business_name: {
    type: String,
    required: true
  },
  business_location: {
    type: String, // Revisar tipo de dato Array, Usar API Maps
    required: true
  },
  business_phone: {
    type: Number,
    required: true,
  },
  business_typeof: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20
  },
  waste_typeof: {
    type: Array,

  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  collect: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'collect'
  }]
})


module.exports = mongoose.model('business', businessSchema)