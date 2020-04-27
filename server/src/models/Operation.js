const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))


module.exports = (sequelize, DataTypes) => {
    const Operation = sequelize.define('Operation', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        

    })
    Operation.associate = function(models) {
        Operation.belongsTo(models.User)
    }
    return Operation
}