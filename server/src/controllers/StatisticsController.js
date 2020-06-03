const sequelize = require('../models/index.js')
const {Operation} = require('../models')

module.exports = {
	async getMonthlyDataOperation(req, res) {
		try {
            const userId = req.user.id
            const { month, type } = req.params
            const data = await sequelize.sequelize.query(`SELECT SUM(AMOUNT) 
                AS amount FROM Operations 
                WHERE strftime('%m', date)='${month}' AND TYPE=${type} AND USERID=${userId} `, {
              model: Operation,
              mapToModel: true // pass true here if you have any mapped fields
            })
            res.send({
                data
            })
        } catch (e) {
        	console.log(e)
            res.status(400).send({
                error: e+'Error encountered'
            })
        }
	},
	async getYearlyDataOperation(req, res) {
		try {
            const userId = req.user.id
            const { year, type } = req.params
            const data = await sequelize.sequelize.query(`SELECT SUM(AMOUNT) 
                AS amount FROM Operations 
                WHERE strftime('%Y', date)='${year}' AND TYPE=${type} AND USERID=${userId} `, {
              model: Operation,
              mapToModel: true // pass true here if you have any mapped fields
            })
            res.send({
                data
            })
        } catch (e) {
            res.status(400).send({
                error: e+'Error encountered'
            })
        }
	},
	async getAverage(req, res) {
		try {
            const userId = req.user.id
            const { type } = req.params
            const data = await sequelize.sequelize.query(`SELECT sum(AMOUNT) 
                AS amount FROM Operations 
                WHERE TYPE=${type} AND USERID=${userId} GROUP BY strftime('%m', date)`, {
              model: Operation,
              mapToModel: true // pass true here if you have any mapped fields
            })
            
            res.send({
                data
            })
        } catch (e) {
        	console.log(e)
            res.status(400).send({
                error: e+'Error encountered'
            })
        }
	}

}