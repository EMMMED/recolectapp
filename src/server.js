const express = require('express')
const router = require('./routes/businessRouter')
const businessRouter = require('./routes/businessRouter')
const userRouter = require('./routes/userRouter')
const collectRouter = require('./routes/collectRouter')

const app = express()

app.use(express.json())

app.use('/business', businessRouter)
app.use('/user', userRouter)
app.use('/collect', collectRouter)


app.get('/'), (request, response) => {
    response.json({
        ok: true, 
        message : 'Conected to Recolect API V-1.0'
    })
}

module.exports = app