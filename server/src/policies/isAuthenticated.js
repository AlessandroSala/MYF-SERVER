const passport = require('passport')


module.exports = function (req, res, next) {
    passport.authenticate('jwt', function(res, req) {
        if(err || !user) {
            res.status(403).send({
                error: "no access"
            })
        } else {
            req.user = user
            next()
        }
    })(req, res, next)

}