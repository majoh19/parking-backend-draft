const {Schema, model} = require('mongoose')

const EntrySchema = Schema({
    entryDate: {
        type: Date,
        required: true
    },
    entryHour: {
        type: String,
        required: true
    },
    plateNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength:6
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
})

module.exports = model('Entry', EntrySchema)