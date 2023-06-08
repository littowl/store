// проверяем роль, чтобы обычный юзер не мог добавить товар

const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function(req, res, next) {
    if (req.method === "OPTION") next()
    try {
        // из хедеров берём токен, выцепляем из разделённой строки второй элемент, потому что первый это тип, а второй токен
        const token = req.headers.authorization.split(' ')[1]
        if (!token) 
            return res.status(401).json({message: 'Пользователь не авторизован'})
        const decoded = jwt.verify(token, process.env.SECRET_KEY) // проверяем токен на валидность

        // если роль из токена не совпадает с переданной ролью
        if (decoded.role !== role)
            return res.status(403).json({message: "Нет доступа"})
        req.user = decoded // к реквесту добавляем данные из токена

        next() // вызываем следующий middleware в цепочке
    } catch (error) {
        res.status(401).json({message: "Пользователь не авторизован"})
    }
    }
}

