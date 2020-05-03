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
        buyPrice: DataTypes.DOUBLE

        

    })
    Investment.associate = function(models) {
        Investment.belongsTo(models.User)
    }
    return Investment
}