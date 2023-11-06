const {Router} = require('express')
const {createExit, listExits, editExit, deleteExit} = require('../controllers/exit')
const router = Router()

router.post('/', createExit)
router.get('/', listExits)
router.put('/:exitId', editExit)
router.delete('/:exitId', deleteExit)

module.exports = router