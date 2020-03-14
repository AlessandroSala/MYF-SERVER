const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60*60*24*7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try{
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch(e){
            res.status(400).send({
                error: 'Error encountered'
            })
        }
    },
    async login (req, res) {
        try{
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user) {
                return res.status(403).send({
                    error: 'Login information incorrect'
                })
            }
            const isPwValid = password === user.password
            if(!isPwValid) {
                return res.status(400).send({
                    error: 'Login information incorrect'
                })
            }
            uToJSON = user.toJSON()
            res.send({
                user: uToJSON,
                token: jwtSignUser(uToJSON)
            })
        } catch(e){
            res.status(500).send({
                error: 'Error occured'
            })
        }
    }
    
}
