const userShcema = require('../models/userModel')
const User = require('../models/userModel')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const { default: mongoose } = require('mongoose')
const saltRounds = 10

async function createUser(data) {
    const userFound = await User.findOne({
        user_mail: data.user_mail
    }) 
    if(userFound){
       throw new createError(432,'user already exist') 
    }
    const newUser = new User(data)
    // _id : mongoose.Schema.Types.ObjectId
    
        await bcrypt.hash(newUser.user_password, saltRounds, function(err, hash) {
        newUser.user_password = hash
        console.log(hash)
        console.log(newUser.user_password)
        return newUser.save()
    })


    // const newUser = new User(data)
}

module.exports = {createUser}