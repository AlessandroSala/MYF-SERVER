const {Operation} = require('../models')


module.exports = {
    async getOps (req, res) {
        const {id} = req.body
        const operation = Operation.findAll({
            limit: 10
        })
        const opToJSON=operation.toJSON()
        res.send({ operation: opToJSON})
    },
    
    async add (req, res) {
        try{
            const operation = await Operation.create(req.body)
            const opToJSON = operation.toJSON()
            res.send({
                operation: opToJSON
            })
        } catch(e){
            res.status(400).send({
                error: e+'Error encountered'
            })
        }
    }/*,

    async remove (req, res) {
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
            const isPwValid = await user.comparePassword(password)
            if(!isPwValid) {
                return res.status(400).send({
                    error: 'Login information incorrect'
                })
            }
            const uToJSON = user.toJSON()
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
    */
}
