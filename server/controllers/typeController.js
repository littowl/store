// добавляем модель для контроллера
const {Type} = require('../models/models')

class TypeController {
    async create (req, res) {
        const {name} = req.body // из тела запроса извлекаем название
        const type = await Type.create({name}) // создаём тип с извлечённым названием
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll() //ищем все типы
        return res.json(types) // отдаём
    }

}

module.exports = new TypeController() 