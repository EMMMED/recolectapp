const mongoose = require('mongoose')

const newsletterSchem = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    picture:{
        type: String,
        required: true
    },
    date_newletter:{
        type: String
    },
    time_newletter:{
        type: String
    }
})

module.exports = mongoose.model('newsletter', newsletterSchem)