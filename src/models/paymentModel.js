const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    payment_name:{
        type: String,
        match: /^[a-zA-Z]{1,35}$/,
        required:true
    },
    payment_card_number: {
        type: Number, // Revisar tipo de dato Date, 
        maxlength: 19,
        minlength: 14,
        required: true
    },
    payment_bank: {
        type: String, // Revisar tipo de dato Date, 
        required: true,
        minlength:3,
        maxlength: 35
    },
    payment_mail: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    }
})


module.exports = mongoose.model( 'payment', paymentSchema )