const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt') // для хэширования паролей, чтобы не хранить их в бд в открытом виде
const jwt = require('jsonwebtoken') // для токена
const {User, Basket} = require('../models/models')

// функция для генерации токена
const generateJwt = (id, email, role) => {  
    return jwt.sign(
            {id, email, role}, // payload с данными пользователя
            process.env.SECRET_KEY, // ключ
            {expiresIn: '24h'} // время жизни токена
    )
}

class UserController {
    async registration (req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({where: {email}}) // ищем по мейлу
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        // хэшируем пароль, передаём его и кол-во раз хэширования
        const hashPassword = await bcrypt.hash(password, 5)

        // создаём пользователя и корзину
        const user = await User.create({email, role, password: hashPassword}) 
        const basket = await Basket.create({userId: user.id}) // id достаем из юзера потому что он автомат делается, ибо в бд так указали

        // создаём токен для получения данных пользователя
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password) // первый пароль написан пользователем, второй из бд
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async check (req, res, next) {
        // генерируем токен и возвращаем его на клиент
        const token = generateJwt(req.user.id, req,user,email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController() // новый объект, созданный из UserController