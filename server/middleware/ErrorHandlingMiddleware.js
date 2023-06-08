const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
    // если класс ошибки ApiError
    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message}) // на клиент возвращаем ответ со статусом и текстом, помещённым в ошибку
    }
    // если попала ошибка не класса ApiError
    return res.status(500).json({message: 'Непредвиденная ошибка'})
}

// нигде не вызвали next, потому что тут работа прекращается и клиенту передаётся ответ