import axios from 'axios'

// запросы, не требующие авторизации
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// запросы с авторизацией
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// для подстановки токена авторизации к каждому запросу
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}` // из локального хранилища получаем токен
    return config
}

// вешаем interceptor на запросы с авторизацией (он будет отрабатывать перед каждым запросом и подставлять токен в header)
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}