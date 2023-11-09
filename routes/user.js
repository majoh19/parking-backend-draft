const {Router} = require('express')
const {createUser, listUsers, editUser, deleteUser} = require('../controllers/user')
const router = Router()

router.post('/', createUser)
router.get('/', listUsers)
router.put('/:userId', editUser)
router.put('/:userId', deleteUser)

module.exports = router