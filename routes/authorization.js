const {Router} = require('express')
const {authenticateUser} = require('../controllers/authorization')
const router = Router()

router.post('/', authenticateUser)

module.exports = router