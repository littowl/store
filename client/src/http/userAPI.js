import { $authHost, $host } from ".";
import jwt_decode from 'jwt-decode'

// функция регистрации
export const registration = async(email, password) => {
    // ответ от сервера (добавляем к url из .env url в кавычках)
    const {data} = await $host.post('api/user/registration', {
        email, 
        password, 
        role: 'ADMIN'
    })
    localStorage.setItem('token', data.token) // в локальное хранилище помещаем токен из тела запроса, чтобы сохранить его
    return jwt_decode(data.token) // возвращаем результат декодирования токена, который находится внутри (получаем мейл, ид и роль)
}

// функция авторизации
export const login = async(email, password) => {
    const {data} = await $host.post('api/user/login', {
        email, 
        password
    })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

// функция проверки авторизации
// пользователь авторизовался, токен сохранился и каждый раз при обновлении страницы будет вызываться check
// если токен не валидный, то юзер будет разлогиниваться, в противном случае редирект юзера на страницу магаза под своим акком
export const check = async() => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}