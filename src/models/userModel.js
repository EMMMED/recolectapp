const mongoose = require('mongoose')
business = require('../models/businessModel')


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
        user_name:{
        type: String,
        match: /^[a-z0-9_-]{3,15}$/,
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
        reuired: false,
    },
    business: [{type:mongoose.Schema.Types.ObjectId, ref:'business'}]
})


module.exports = mongoose.model( 'user', userSchema )