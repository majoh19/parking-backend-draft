const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    try {
        const payload = jwt.verify(token, '123456')
        req.payload = payload
        next()
    } catch (error) {
        return res.status(500).json({message: 'Error' + error})
    }
}

module.exports = {validateJWT}