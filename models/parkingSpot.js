const {Schema, model} = require('mongoose')

const ParkingSpotSchema = Schema({
    spotNumber: {
        type: String,
        required: true,
        unique: true
    },
    entry: {
        type: Schema.Types.ObjectId,
        ref: 'Entry'
    },
    exit: {
        type: Schema.Types.ObjectId,
        ref: 'Exit'
    }
})

module.exports = model('ParkingSpot', ParkingSpotSchema)