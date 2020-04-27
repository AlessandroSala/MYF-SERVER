const AuthenticationController = require('./controllers/AuthenticationController')
const OperationsController = require('./controllers/OperationsController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
        app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)

        app.post('/login',
        AuthenticationController.login)
    
        app.get('/operations',
        OperationsController.getOps)
        app.post('/operations',
        OperationsController.add)
}
