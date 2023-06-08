import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { useContext } from 'react'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import Shop from '../pages/Shop'

const AppRouter = observer(() => {
    const {user} = useContext(Context) // из контекста получаем  UserStore, который был передан в объект в контексте
    console.log(user.isAuth) 
    return (          
            <Routes>
                {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} />
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} />
                )}
                <Route path='*' element={<Shop />}/>
            </Routes>   
    )
})

export default AppRouter