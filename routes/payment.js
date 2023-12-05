const {Router} = require('express')
const {createPayment, listPayments, editPayment, deletePayment} = require('../controllers/payment')
const router = Router()

router.post('/', createPayment)
router.get('/', listPayments)
router.put('/:paymentId', editPayment)
router.delete('/:paymentId', deletePayment)

module.exports = router