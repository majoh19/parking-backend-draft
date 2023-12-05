const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: false }))

const entry = require('./routes/entry')
const exit = require('./routes/exit')
const user = require('./routes/user')
const parkingSpot = require('./routes/parkingSpot')
const payment = require('./routes/payment')
const authorization = require('./routes/authorization')

app.use(express.json())

app.use('/entries', entry)
app.use('/exits', exit)
app.use('/users', user)
app.use('/parkingSpots', parkingSpot)
app.use('/payments', payment)
app.use('/authorization', authorization)

module.exports = app