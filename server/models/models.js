// здесь описываем модели данных

const sequelize = require('../db') //импортируем объект
const {DataTypes} =  require('sequelize') // импортируем из пакета sequelize класс для описания типов полей

// модель пользователя (первое в скобках имя, а второе в фигурных скобках поля)
const User = sequelize.define('user', {
    // у поля id тип integer, это первичный ключ и при создании каждого нового объекта id будет 1 2 и тд
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true}, // email должен быть уникальным
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"} // по умолчанию делаем пользователя юзером
})

// модель корзины
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    
})

// модель товара в корзине
const BasketToy = sequelize.define('basket_toy', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

//модель товара
const Toy = sequelize.define('toy', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.STRING, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

// модель типа
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

// модель бренда
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

// модель рейтинга
const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

// модель описания
const ToyInfo = sequelize.define('toy_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false},
})

// связующая модель бренда и типа
const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// описываем как модели связаны друг с другом
User.hasOne(Basket) // одна запись пользователя (User) в бд содержит одну запись с корзиноц (Basket)
Basket.belongsTo(User) // сущность Basket принадлежит Usery

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketToy)
BasketToy.belongsTo(Basket)

BasketToy.hasOne(Toy)
Toy.belongsTo(BasketToy)

Toy.hasOne(ToyInfo, {as: 'info'}) // указываем поле, которое будет у массива характеристик
ToyInfo.belongsTo(Toy)

Toy.hasMany(Rating)
Rating.belongsTo(Toy)

Type.hasMany(Toy)
Toy.belongsTo(Type)

Brand.hasMany(Toy)
Toy.belongsTo(Brand)

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

module.exports = {
    User, 
    Basket, 
    BasketToy,
    Toy,
    Type,
    Brand,
    Rating,
    TypeBrand,
    ToyInfo
}