// глобальное хранилище

import {makeAutoObservable} from 'mobx'

// тут храним параметры товара
export default class ToyStore {
    constructor() {
        this._types = []
        this._brands = []
        this._toys = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this) //mobx будет следить за перемменными юзера и перерисовывать при их изменении
    }

    set types(types) {
        this._types = types
    }

    set brands(brands) {
        this._brands = brands
    }
    
    set toys(toys) {
        this._toys = toys
    }

    set selectedType(type) {
        this.page = 1
        this._selectedType = type
    }

    set selectedBrand(brand) {
        this.page = 1
        this._selectedBrand = brand
    }

    set page(page) {
        this._page = page
    }

    set totalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get toys() {
        return this._toys
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedBrand() {
        return this._selectedBrand
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get limit() {
        return this._limit
    }
 }