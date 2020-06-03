const {Operation} = require('../models')
const sequelize = require('../models/index.js')
const { QueryTypes } = require('sequelize');
const _ = require('lodash')

module.exports = {
    async categoryData(req, res) {
        try {
            const userId = req.user.id
            const { month } = req.params
            const categoriesData = await sequelize.sequelize.query(`SELECT title as category, SUM(AMOUNT) 
                AS amount FROM Operations 
                WHERE strftime('%m', date)='${month}' AND TYPE=1 AND USERID=${userId} GROUP BY title `, {
              model: Operation,
              mapToModel: true // pass true here if you have any mapped fields
            })
            
            res.send({
                categoriesData
            })
        } catch (e) {
            res.status(400).send({
                error: e+'Error encountered'
            })
        }

    },
    async dayByDayExpenses(req, res) {
        try {
            const userId = req.user.id
            const { month } = req.params
            const expenses = await sequelize.sequelize.query(`SELECT strftime('%d', date) as day, SUM(AMOUNT) 
                AS amount FROM Operations 
                WHERE strftime('%m', date)='${month}' AND USERID=${userId} AND TYPE=1 GROUP BY day `, {
              model: Operation,
              mapToModel: true // pass true here if you have any mapped fields
            })
            
            res.send({
                expenses
            })
        } catch (e) {
            res.status(400).send({
                error: e+'Error encountered'
            })
        }
    },
    async dayByDayEarnings(req, res) {
        try {
            const userId = req.user.id
            const { month } = req.params
            const earnings = await sequelize.sequelize.query(`SELECT strftime('%d', date) as day, SUM(AMOUNT) 
                AS amount FROM Operations 
                WHERE strftime('%m', date)='${month}' AND USERID=${userId} AND TYPE=0 GROUP BY day `, {
              model: Operation,
              mapToModel: true // pass true here if you have any mapped fields
            })
            
            res.send({
                earnings
            })
        } catch (e) {
            res.status(400).send({
                error: e+'Error encountered'
            })
        }
    },
    async indexAll (req, res) {
        try {
            const id = req.user.id
            const operations = await Operation.findAll({
                where: {
                    UserId: id
                }
            })
            //.map(operation => operation.toJSON())
            
            res.send({operations})
        } catch (e) {
            res.status(400).send({
                error: e+'Error encountered'
            })
        }
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
