const {Sequelize} = require('sequelize')

// экспортируем созданный объект
module.exports = new Sequelize(
    //   указываем конфигурацию
    process.env.DB_NAME, //название бд
    process.env.DB_USER, //пользователь
    process.env.DB_PASSWORD, //пароль
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)