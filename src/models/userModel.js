const mongoose = require('mongoose')
business = require('../models/businessModel')
payment = require('../models/paymentModel')
walletUser = require('../models/walletUserModel')

const userSchema = new mongoose.Schema({
    user_name:{
        type: String,
        match: /^[aA-Zz0-9_-]{3,15}$/,
        required:true
    },
    user_mail: {
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    },
    user_password: {
        type: String,
        required: true, 
        match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        //Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
    },
    user_full_name: {
        type: String, 
        required: false,
        match: /^[a-zA-Z0-9]{3,35}$/
    },
    user_phone: {
        type: String,
        required: false,
        match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        //Match a phone number with "-" and/or country code.
    },
    user_picture: {
        type: String,
        required: false,
    },
    business: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'business'
    }],
    payment: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'payment'
    },
    walletUser: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'walletUser'
    }
})


module.exports = mongoose.model('user', userSchema )