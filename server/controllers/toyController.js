const {Toy, ToyInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

// ВНИМАНИЕ ВНИМАНИЕ если вдруг сломалось, то попробуй из const fileName и const offset сделать let 

class ToyController {
    async create (req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4()+".jpg" //генерируем имя картинки
            // перемещаем картинку в директорию static с помощью mv и адаптации пути к этой директории
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const toy = await Toy.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                // парсим инфу, из формы она бы пришла в виде строки
                info = JSON.parse(info)
                // распарсили объект, пробегаемся по нему (типа у нас у Device много DeviceInfo, поэтому для каждого DeviceInfo создаём объект)
                info.forEach(i => ToyInfo.create({
                    title: i.title,
                    description: i.description,
                    toyId: toy.id
                }))
            }

            return res.json(toy)
        } catch (ex) {
            // передаем в следующую функцию обработки ошибку
            next(ApiError.badRequest(ex.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query // с помощью query получаем доступ к URL
        limit = limit || 9
        page = page || 1
        let offset = page * limit - limit // отступ, на сколько товаров нужно отступить на новой странице
        let toys
        // в зависимости от заданных параметров типа и бренда возвращается разное количество
        if (!brandId && !typeId) {
            toys = await Toy.findAndCountAll({limit, offset}) //получаем данные о количестве, в count общее кол-во товаров, в row только отображаемые
        } else if (brandId && !typeId) {
            toys = await Toy.findAndCountAll({where:{brandId}, limit, offset})

        } else if (!brandId && typeId) {
            toys = await Toy.findAndCountAll({where:{typeId}, limit, offset})
        } else if (brandId && typeId) {
            toys = await Toy.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(toys)
    }

    // функция для детального просмотра товара 
    async getOne(req, res) {
        const {id} = req.params 
        const toy = await Toy.findOne(
            {
                where: {id}, // where это условие по которому ищется
                //include: [{model: ToyInfo, as: 'info'}] // массив характеристик, указываем модель, которую хотим подгрузить и название поля в модели
            },
        )
        return res.json(toy)
    }

}

module.exports = new ToyController() 