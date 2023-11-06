const Exit = require('../models/exit')
const {request, response} = require('express')
const {validationResult, check} = require('express-validator')

//Create
const createExit = async (req = request, res = response) => {
    try {
        await Promise.all([
            check('exitDate', 'invalid.exitDate').matches(/^\d{2}\/\d{2}\/\d{4}$/).run(req),
            check('exitHour', 'invalid.exitHour').matches(/^\d{2}:\d{2}$/).run(req),
            check('plateNumber', 'invalid.plateNumber').not().isEmpty().run(req)
        ])
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({message: errors.array})
        }
        let exit = new Exit()
        exit.exitDate = new Date().toLocaleDateString('eng-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        })
        exit.exitHour = new Date().toLocaleTimeString('eng-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
        exit.plateNumber = req.body.plateNumber
        exit = await exit.save()
        res.send(exit)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while creating the exit')
    }
}

//List
const listExits = async (req = request, res = response) => {
    try {
        const exits = await Exit.find()
        res.send(exits)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while listing the exits')
    }
}

//Edit
const editExit = async (req = request, res = response) => {
    try {
        const exitId = req.params.exitId
        const exit = await Exit.findById(exitId)
        if (!exit) {
            return res.status(404).send('Exit not found')
        }
        if (req.body.exitDate) exit.exitDate = req.body.exitDate
        if (req.body.exitHour) exit.exitHour = req.body.exitHour
        if (req.body.plateNumber) exit.plateNumber = req.body.plateNumber
        const updatedExit = await exit.save()
        res.send(updatedExit)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while editing the exit')
    }
}

//Delete
const deleteExit = async (req = request, res = response) => {
    try {
        const exitId = req.params.exitId
        const exit = await Exit.findById(exitId)
        if (!exit) {
            return res.status(404).send('Exit not found')
        }
        await Exit.findByIdAndDelete(exitId)
        res.send('Exit deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while deleting the exit')
    }
}

module.exports ={createExit, listExits, editExit, deleteExit}