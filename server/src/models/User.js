const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options){
    const SALT = 8
    if(!user.changed('password')) {
        return;
    }
    return bcrypt.genSaltAsync(SALT)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
        user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        balance: DataTypes.DOUBLE
    }, { hooks: {
        beforeSave: hashPassword
        }
    })
    User.prototype.comparePassword = function (password) {
        console.log("checking")
        return bcrypt.compareAsync(password, this.password)
    }
    return User
}