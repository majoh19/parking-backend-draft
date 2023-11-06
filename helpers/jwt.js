const jwt = require('jsonwebtoken')

const generateJWT = (User) => {
    const payload = {
        userId: User.userId,
        name: User.name,
        email: User.email,
        password: User.password
    }
    const token = jwt.sign(payload, '123456', {expiresIn: '24h'})
    return token
}

module.exports = {generateJWT}