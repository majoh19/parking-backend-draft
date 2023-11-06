const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const entry = require('./routes/entry')
const exit = require('./routes/exit')

app.use(express.json())

app.use('/entries', entry)
app.use('/exits', exit)

module.exports = app