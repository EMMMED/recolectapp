require('dotenv').config()
const mongoose = require('mongoose')
const server = require('./src/server')

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST, 
    DB_NAME,
    JWT_SECRET
} = process.env


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`)
//mongodb+srv://Admin:<password>@recolectappapi.lowew.mongodb.net/test

.then ( () => {
    server.listen(8080, () => {
        console.log('Recolectapp API is ready on http://localhost:8080')
    })
})

.catch( error => {
    console.log('DB conection Failed on http://localhost:3000')
    console.log(error)
})