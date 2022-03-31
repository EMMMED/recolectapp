const mongoose = require('mongoose')
user = require('../models/userModel')
business = require('../models/businessModel')

const walletUserSchema = new mongoose.Schema({
    plastic_wallet:{
    type: Number,
    required:true,
    default:0
    },
    carton_wallet:{
    type: Number,
    required:true,
    default:0
    },
    glass_wallet:{
    type: Number,
    required:true,
    default:0
    },
    oil_wallet:{
    type: Number,
    required:true,
    default:0
    },
    cans_wallet:{
    type: Number,
    required:true,
    default:0
    },
    grease_wallet:{
    type: Number,
    required:true,
    default:0
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    business: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'business'
    }]
})


module.exports = mongoose.model( 'walletUser', walletUserSchema )