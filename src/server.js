const express = require('express')
const cors = require('cors')

const businessRouter = require('./routes/businessRouter')
const userRouter = require('./routes/userRouter')
const collectRouter = require('./routes/collectRouter')
const paymentRouter = require('./routes/paymentRouter')
const walletRouter = require('./routes/walletUserRouter')
const wastePriceRouter = require('./routes/wastePriceRouter')
const authRouter = require('./routes/authRouter')


const app = express()
app.use(cors())
app.use(express.json())

app.use('/business', businessRouter)
app.use('/user', userRouter)
app.use('/collect', collectRouter)
app.use('/payment', paymentRouter)
app.use('/walletUser', walletRouter)
app.use('/wastePrice', wastePriceRouter)
app.use('/auth', authRouter)



app.get('/'), (request, response) => {
    response.json({
        ok: true, 
        message : 'Conected to Recolect API V-1.0'
    })
}

module.exports = app