const User = require('../models/user')
const { request, response } = require('express')
const { validationResult, check } = require('express-validator')
const bycript = require('bcryptjs')
const { validateJWT } = require('../middleware/validateJWT')

//Create user
const createUser = async (req = request, res = response) => {
    try {
        await Promise.all([
            check('name', 'invalid.name').not().isEmpty().run(req),
            check('email', 'invalid.email').isEmail().run(req),
            check('password', 'invalid.password').not().isEmpty().run(req)
        ])
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ message: errors.array() })
        }
        const existUser = await User.findOne({ email: req.body.email })
        if (existUser) {
            return res.status(400).send('The user already exists')
        }
        validateJWT(req, res, async () => {
            let user = new User()
            user.name = req.body.name
            user.email = req.body.email
            const salt = bycript.genSaltSync()
            const password = bycript.hashSync(req.body.password, salt)
            user.password = password
            user = await user.save()
            res.send(user)
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while creating the user')
    }
}

//List users
const listUsers = async (req = request, res = response) => {
    try {
        validateJWT(req, res, async () => {
            const users = await User.find()
            res.send(users)
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while listing the users')
    }
}

//Edit user
const editUser = async (req = request, res = response) => {
    try {
        validateJWT(req, res, async () => {
            const userId = req.params.userId
            const user = await User.findById(userId)
            if (!user) {
                return res.status(400).send('User not found')
            }
            if (req.body.name) user.name = req.body.name
            if (req.body.email) user.email = req.body.email
            const updatedUser = await user.save()
            res.send(updatedUser)
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while editing the user')
    }
}

//Delete user
const deleteUser = async (req = request, res = response) => {
    try {
        validateJWT(req, res, async () => {
            const userId = req.params.userId
            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).send('User not found')
            }
            await User.findByIdAndDelete(userId)
            res.send('User deleted successfully')
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while deleting the user')
    }
}

module.exports = { createUser, listUsers, editUser, deleteUser }