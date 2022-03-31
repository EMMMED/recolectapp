const mongoose = require('mongoose')
business = require('../models/businessModel')

const collectSchema = new mongoose.Schema({
    business: {type:mongoose.Schema.Types.ObjectId, ref: 'business'},
    collect_name:{
        type: String,
        match: /^[a-zA-Z]{3,20}$/,
        required:true
    },
    collect_date: {
        type: String, // Revisar tipo de dato Date, 
        required: true
    },
    collect_time: {
        type: String, // Revisar tipo de dato Date, 
        required: true
    },
    collect_waste_typeof: {
        type: Array,
        minlength: 1,
        maxlength: 6
    },
    collect_status: {
        type: Boolean
        // False = Incomplete , True = Completed
    }
})


module.exports = mongoose.model( 'collect', collectSchema )