const {Operation} = require('../models')


module.exports = {
    async indexAll (req, res) {
        const {id} = req.user.id
        const {limit} = req.body
        const operations = Operation.findAll({
            where: {
                UserId: id
            },
            limit: limit
        }).map(operation => operation.toJSON())
        res.send({operations})
    },
    
    async add (req, res) {
        try{
            //const {id} = req.user.id
            const {title, description, type, id, amount} = req.body
            console.log(title, description, type, id)

            const operation = await Operation.create({
                UserId: id,
                title: title,
                description: description,
                type: type,
                amount: amount
            })
            const opToJSON = operation.toJSON()
            res.send({
                operation: opToJSON
            })
        } catch(e){
            res.status(400).send({
                error: e+'Error encountered'
            })
        }
    },

    async remove (req, res) {
        try{
            //const {userId} = req.user.id
            const operationToRemove = req.params.operation
            const userId=operation.userId
            console.log(userId)
            //const {userId, operationId} = operationToRemove
            const operation = await Operation.findOne({
                where: {
                    id: operationId,
                    UserId: userId
                }
            })
            if(!operation) {
                res.status(403).send({
                    error: 'No access to this operation'
                })
            }
            await operation.destroy()
            res.send({
                operation
            })
        } catch(e){
            res.status(500).send({
                error: 'Error occured'
            })
        }
    }
}
