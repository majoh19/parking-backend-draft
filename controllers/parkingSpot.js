const ParkingSpot = require('../models/parkingSpot')
const {request, response} = require('express')
const {validationResult, check} = require('express-validator')
const {validateJWT} = require('../middleware/validateJWT')

//Create spot
const createParkingSpot = async (req = request, res = response) => {
    try {
        await Promise.all([
            check('spotNumber', 'invalid.spotNumber').not().isEmpty().run(req),
            check('entry', 'invalid.entry').not().isEmpty().run(req),
            check('exit', 'invalid.exit').not().isEmpty().run(req)
        ])
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({message: errors.array()})
        }
        const existParkingSpot = await ParkingSpot.findOne({spotNumber: req.body.spotNumber})
        if (existParkingSpot) {
            return res.status(400).send('The parking spot already exists')
        }
        validateJWT(req, res, async () => {
            let parkingSpot = new ParkingSpot()
            parkingSpot.spotNumber = req.body.spotNumber
            parkingSpot.entry = req.body.entry
            parkingSpot.exit = req.body.exit
            parkingSpot = await parkingSpot.save()
            res.send(parkingSpot)
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while creating the parking spot')
    }
}

//List parking spots
const listParkingSpots = async (req = request, res = response) => {
    try {
        validateJWT(req, res, async () => {
            const parkingSpots = await ParkingSpot.find()
            res.send(parkingSpots)
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while listing the parking spots')
    }
}

//Edit parking spot
const editParkingSpot = async (req = request, res = response) => {
    try {
        validateJWT(req, res, async () => {
            const parkingSpotId = req.params.parkingSpotId
            const parkingSpot = await ParkingSpot.findById(parkingSpotId)
            if (!parkingSpot) {
                return res.status(400).send('Parking spot not found')
            }
            if (req.body.spotNumber) parkingSpot.spotNumber = req.body.spotNumber
            if (req.body.entry) parkingSpot.entry = req.body.entry
            if (req.body.exit) parkingSpot.exit = req.body.exit
            const updatedParkingSpot = await parkingSpot.save()
            res.send(updatedParkingSpot)
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while editing the parking spot')
    }
}

//Delete parking spot
const deleteParkingSpot = async (req = request, res = response) => {
    try {
        validateJWT(req, res, async () => {
            const parkingSpotId = req.params.parkingSpotId
            const parkingSpot = await ParkingSpot.findById(parkingSpotId)
            if (!parkingSpot) {
                return res.status(400).send('Parking spot not found')
            }
            await ParkingSpot.findByIdAndDelete(parkingSpotId)
            res.send('Parking spot deleted successfully')
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while deleting the parking spot')
    }
}

module.exports = {createParkingSpot, listParkingSpots, editParkingSpot, deleteParkingSpot}