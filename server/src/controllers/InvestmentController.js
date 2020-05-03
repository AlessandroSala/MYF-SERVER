const { Investment } = require('../models')


module.exports = {
    async getAll(req, res) {
        const { id } = req.user.id
        const { limit } = req.body
        const investment = Investment.findAll({
            where: {
                UserId: id
            },
            limit: limit
        }).map(investment => investment.toJSON())
        res.send({ investment })
    },

    async add(req, res) {
        try {
            //const { id } = req.user.id
            const { price, quantity, ISIN, id } = req.body
            const investment = await Investment.create({
                title: title,
                description: description,
                type: type,
                UserId: id
            })
            const opToJSON = operation.toJSON()
            res.send({
                operation: opToJSON
            })
        } catch (e) {
            res.status(400).send({
                error: e + 'Error encountered'
            })
        }
    },

    async remove(req, res) {
        try {
            const { userId } = req.user.id
            const { operationId } = req.params
            const operation = await Operation.findOne({
                where: {
                    id: operationId,
                    UserId: userId
                }
            })
            if (!operation) {
                res.status(403).send({
                    error: 'No access to this operation'
                })
            }
            await operation.destroy()
            res.send({
                operation
            })
        } catch (e) {
            res.status(500).send({
                error: 'Error occured'
            })
        }
    }
}
