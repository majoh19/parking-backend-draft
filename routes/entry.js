const {Router} = require('express')
const {createEntry, listEntries, editEntry, deleteEntry} = require('../controllers/entry')
const router = Router()

router.post('/', createEntry)
router.get('/', listEntries)
router.put('/:entryId', editEntry)
router.delete('/:entryId', deleteEntry)

module.exports = router