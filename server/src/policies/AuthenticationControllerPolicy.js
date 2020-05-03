
const joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = {
            email: joi.string().email(),
            password: joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{6,32}$') // TODO: add special characters
            )
        }

        const {error, value} = joi.validate({
            email: req.body.email,
            password: req.body.password},
            schema)

        if (error) {
            switch(error.details[0].context.key){
                case 'email':
                    res.status(400).send({error: 'Invalid email'})
                break;
                case 'password':
                    res.status(400).send({error: 'Invalid password (only characters and numbers between 6 and 32)'})
                break;
                default:
                    res.status(400).send({error: 'Unknown error during validation'})
            }
        } else {
            next()
        }
    }
}