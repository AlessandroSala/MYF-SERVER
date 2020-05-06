const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))


module.exports = (sequelize, DataTypes) => {
    const Investment = sequelize.define('Investment', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        ISIN: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        purchasePrice: DataTypes.DOUBLE
    },{ hooks: {
        afterCreate: function (investment, options) {
            const {User} = require('../models')
            try{
                User.findByPk(investment.UserId).then(user => {
                    currentBalance = Number(user.balance)
                    amountToAdd = -investment.purchasePrice*investment.quantity
                    user.update({
                        balance: currentBalance + amountToAdd
                    })
                })
            } catch(err) {
                console.log(err)
            }
            
        },
        afterDestroy: function (investment, options) {
            const {User} = require('../models')
            User.findByPk(investment.UserId).then(user => {
                const updatedBalance = Number(user.balance) + investment.purchasePrice*investment.quantity
                user.update({
                    balance: updatedBalance
                }).then()
            })
            
        }
    }})
    Investment.associate = function(models) {
        Investment.belongsTo(models.User)
    }
    return Investment
}