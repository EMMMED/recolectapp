const User = require('../models/userModel')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const saltRounds = 10

async function createUser(data) {
    const userFound = await User.findOne({
        user_mail: data.user_mail
    }) 
    if(userFound){
       throw new createError(432,'user already exist') 
    }
    const newUser = new User(data)
    
    await bcrypt.hash(newUser.user_password, saltRounds, function(err, hash) {
        newUser.user_password = hash
        console.log(hash)
        console.log(newUser.user_password)
        return newUser.save()
    })  
      
    // const newUser = new User(data)
}

function getAllUser(){
    return User.find()
}

function getByIdUser(id){
    return User.findById(id)
}
    
function bussinesByUser(id){
    return User.findById(id).populate({ path: 'business', select: ['business_name', 'business_phone'] })
}

module.exports = {
    createUser,
    getAllUser,
    getByIdUser,
    bussinesByUser
}