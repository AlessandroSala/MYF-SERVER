module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'myf',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PW || '',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './myf.sqlite'
        }
    }
}
