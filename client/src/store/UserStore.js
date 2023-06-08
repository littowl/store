// глобальное хранилище

import {makeAutoObservable} from 'mobx'

// тут храним параметры пользователя
export default class UserStore {
    constructor() {
        this._isAuth = false 
        this._user = {}
        makeAutoObservable(this) //mobx будет следить за перемменными юзера и перерисовывать при их изменении
    }

    set isAuth(bool) {
        this._isAuth = bool
    }

    set user(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
 }