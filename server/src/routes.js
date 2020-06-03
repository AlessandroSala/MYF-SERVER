const AuthenticationController = require('./controllers/AuthenticationController')
const OperationsController = require('./controllers/OperationsController')
const InvestmentsController = require('./controllers/InvestmentsController')
const StockController = require('./controllers/StockController')
const StatisticsController = require('./controllers/StatisticsController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
        app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)

        app.post('/login',
        AuthenticationController.login)
        
        app.get('/operations',
        isAuthenticated, 
        OperationsController.indexAll)

        app.post('/operations',
        isAuthenticated,
        OperationsController.add)

        app.delete('/operations',
        isAuthenticated,
        OperationsController.remove)

        app.get('/investments',
        isAuthenticated, 
        InvestmentsController.indexAll)

        app.post('/investments',
        isAuthenticated,
        InvestmentsController.add)

        app.delete('/investments',
        isAuthenticated,
        InvestmentsController.remove)

        app.delete('/investments/sell',
        isAuthenticated,
        InvestmentsController.sell)

        app.get('/stock/:isin',
                StockController.getPrices)

        app.get('/categories/month/:month',
                isAuthenticated,
                OperationsController.categoryData)

        app.get('/statistics/dbdexp/:month',
                isAuthenticated,
                OperationsController.dayByDayExpenses)

        app.get('/statistics/dbdear/:month',
                isAuthenticated,
                OperationsController.dayByDayEarnings)

        app.get('/statistics/avg/:type',
                isAuthenticated,
                StatisticsController.getAverage)

        app.get('/statistics/yearly/:type/:year',
                isAuthenticated,
                StatisticsController.getYearlyDataOperation)

        app.get('/statistics/monthly/:type/:month',
                isAuthenticated,
                StatisticsController.getMonthlyDataOperation)
}
