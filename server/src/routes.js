const AuthenticationController = require('./controllers/AuthenticationController')
const OperationsController = require('./controllers/OperationsController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
        app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)

        app.post('/login',
        AuthenticationController.login)
        
        app.get('/operations',
        //isAuthenticated, 
        OperationsController.indexAll)

        app.post('/operations',
        //isAuthenticated,
        OperationsController.add)

        app.delete('/operations/:operation',
        //isAuthenticated,
        OperationsController.remove)
}
