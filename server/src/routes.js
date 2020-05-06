const AuthenticationController = require('./controllers/AuthenticationController')
const OperationsController = require('./controllers/OperationsController')
const InvestmentsController = require('./controllers/InvestmentsController')

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

        app.delete('/operations',
        //isAuthenticated,
        OperationsController.remove)

        app.get('/investments',
        //isAuthenticated, 
        InvestmentsController.indexAll)

        app.post('/investments',
        //isAuthenticated,
        InvestmentsController.add)

        app.delete('/investments/remove',
        //isAuthenticated,
        InvestmentsController.remove),
        app.delete('/investments/sell',
        //isAuthenticated,
        InvestmentsController.sell)
}
