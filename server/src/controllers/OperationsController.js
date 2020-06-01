const {Operation} = require('../models')
const _ = require('lodash')

module.exports = {
    async indexAll (req, res) {
        const id = req.user.id
        //const {limit, id} = req.body
		const limit = 10
        const operations = await Operation.findAll({
            where: {
                UserId: id
            },
            limit: limit
        })
        //.map(operation => operation.toJSON())
        
        res.send({operations})
    },
    
    async add (req, res) {
        try{
            const id = req.user.id
            const {title, description, type, amount, date} = req.body

            const operation = await Operation.create({
                UserId: id,
                title: title,
                description: description,
                type: type,
                amount: amount,
                date: date
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
            const userId = req.user.id
            const { operationId } = req.body
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
        } catch(e) {
            res.status(500).send({
                error: e+'Error occured'
            })
        }
    }
}
