const passport = require('passport')


module.exports = function (req, res, next) {
    passport.authenticate('jwt', function(err, user) {
        if(err || !user) {
            console.log("no access error")
            console.log(user)
            console.log(err)
            res.status(403).send({

                error: "no access"
            })
        } else {
            req.user = user.dataValues
            next()
        }
    })(req, res, next)

}