require('dotenv').config() // импортируем конфиг из .env
const express = require('express') // импортируем модуль express
const sequelize = require('./db') // импортируем объект из db
const cors = require('cors') // чтобы могли отправлять запросы с браузера, передаём это в app в use
const fileUpload = require('express-fileupload')
const router = require('./routes/index') // импортируем роутер
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path') // для пути к static

// из перменных окружения получаем порт
const PORT =  process.env.PORT  || 5000 

const app = express() // с этого объекта начинается запуск сервера
app.use(cors())
app.use(express.json()) // чтобы могло парсить формат json
app.use(express.static(path.resolve(__dirname, 'static'))) // для обращения к файлу из static и его получения
app.use(fileUpload({})) // для картинок
app.use('/api', router) // для роутинга (url по которому роутер должен обрабатываться и сам роутер)


// Обработка ошибок
app.use(errorHandler)

// функция подключения к бд
const start = async () => {
    try {
        //устанавливаем подключение к бд
        await sequelize.authenticate()
        // //сверяем состояние бд со схемой данных
        await sequelize.sync()
        // передаём порт и в случае успешного запуска сервера сработает коллбэк
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
