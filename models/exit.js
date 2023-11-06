const {Schema, model} = require('mongoose')

const ExitSchema = Schema ({
    exitDate: {
        type: String,
        required: true
    },
    exitHour: {
        type: String,
        required: true
    },
    plateNumber: {
        type: String, 
        required: true,
        minlength: 6,
        maxlength:6
    }
})

module.exports = model('Exit', ExitSchema)