const {Router} = require('express')
const {createParkingSpot, listParkingSpots, editParkingSpot, deleteParkingSpot} = require('../controllers/parkingSpot')
const router = Router()

router.post('/', createParkingSpot)
router.get('/', listParkingSpots)
router.put('/:parkingSpotId', editParkingSpot)
router.delete('/:parkingSpotId', deleteParkingSpot)

module.exports = router