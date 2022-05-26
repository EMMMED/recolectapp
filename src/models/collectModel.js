const mongoose = require('mongoose')
business = require('../models/businessModel')


const collectSchema = new mongoose.Schema({
    business: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'business'
    },
    collect_name:{
        type: String,
        
        required:true
    },
    collect_time: {
        type: String,
        required: true
    },
    collect_date: {
        type: String, // Revisar tipo de dato Date, 
        required: true
    },
    waste_typeof: {
        type: Array,
        minlength: 1,
        maxlength: 6
    },
    collect_status: {
        type: Boolean,
        default: false
        // False = Incomplete , True = Completed
    },
    creation_date: {
        type: String,
        required: true
    },
    waste_amounts: {
        type: Object,
        maxlength:6,
        minlength:1
    }
})


module.exports = mongoose.model( 'collect', collectSchema )