const { Investment, Operation } = require('../models')

module.exports = {
    async indexAll(req, res) {
        const id = req.user.id
		const limit = 10
        const investments = await Investment.findAll({
            where: {
                UserId: id
            },
            limit: limit
        })
        //.map(investment => investment.toJSON())
        res.send({ investments })
    },

    async add(req, res) {
        try {
            const id = req.user.id
            const { purchasePrice, quantity, ISIN } = req.body
            const investment = await Investment.create({
                ISIN: ISIN,
                purchasePrice: purchasePrice,
                quantity: quantity,
                UserId: id
            })
            const investmentToJSON = investment.toJSON()
            res.send({
                investmentToJSON
            })
        } catch (e) {
            res.status(400).send({
                error: e + 'Error encountered'
            })
        }
    },
    async remove (req, res) {
        try{
            const userId = req.user.id
            const { investmentId } = req.body
            const investment = await Investment.findOne({
                where: {
                    id: investmentId,
                    UserId: userId
                }
            })
            if(!investment) {
                res.status(403).send({
                    error: 'No access to this investment'
                })
            }
            await investment.destroy()
            res.send({
                investment
            })
            
        } catch(e) {
            res.status(500).send({
                error: e+'Error occured'
            })
        }
    },
    async sell (req, res) {
        try{
            const userId = req.user.id
            const { investmentId, sellPrice } = req.body
            const investment = await Investment.findOne({
                where: {
                    id: investmentId,
                    UserId: userId
                }
            })
            if(!investment) {
                res.status(403).send({
                    error: 'No access to this investment'
                })
            }
            await investment.destroy().then(investment => {
                console.log(sellPrice, investment.purchasePrice, investment.quantity)
                const difference = (Number(sellPrice) - Number(investment.purchasePrice))*Number(investment.quantity)
                console.log(difference)
                const currDate = new Date()
                const title = `Sell action, ${investment.ISIN}`
                const description = `Investment sold: ${currDate}`
                const type = difference < 0 ? 1 : 0;
                const userId = investment.UserId
                const amount = Math.abs(difference)
                const operation = Operation.add

                console.log(amount)
                Operation.create({
                    UserId: userId,
                    title: title,
                    description: description,
                    type: type,
                    amount: amount
                }).then((operation) => {
                    res.send({
                        investmentSold: investment,
                        operationCreated: operation
                    })
                })
            })
            
        } catch(e) {
            res.status(500).send({
                error: e+'Error occured'
            })
        }
    }
}
