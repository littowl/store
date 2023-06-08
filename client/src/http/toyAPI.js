import { $authHost, $host } from ".";
import jwt_decode from 'jwt-decode'

// cоздание типа
export const createType = async(type) => {
    // ответ от сервера (добавляем к url из системной переменной url в кавычках)
    const {data}= await $authHost.post('api/type', type)
    return data
}

// получение типов
export const fetchTypes = async() => {
    const {data} = await $host.get('api/type')
    return data
}

// cоздание бренда
export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

// получение брендов
export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

// создание товаров
export const createToy = async (toy) => {
    const {data} = await $authHost.post('api/toy', toy)
    return data
}

// получение товаров
export const fetchToys = async (typeId, brandId, page, limit) => {
    const {data} = await $host.get('api/toy', {params: {
        typeId, brandId, page, limit
    }})
    return data
}

// получение одного товара
export const fetchOneToy = async (id) => {
    const {data} = await $host.get('api/toy/' + id)
    return data
}