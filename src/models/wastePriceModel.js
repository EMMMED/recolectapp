const mongoose = require('mongoose')
user = require('../models/userModel')


const wastePriceSchema = new mongoose.Schema({
    plastic_price:{
        type: Number,
        required:true,
        default:2
        },
    carton_price:{
        type: Number,
        required:true,
        default:5
        },
    glass_price:{
        type: Number,
        required:true,
        default:3
        },
    oil_price:{
        type: Number,
        required:true,
        default:10
        },
    cans_price:{
        type: Number,
        required:true,
        default:10
        },
    grease_price:{
        type: Number,
        required:true,
        default:20
        },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
        }
})


module.exports = mongoose.model( 'wastePrice', wastePriceSchema )