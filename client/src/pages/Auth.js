import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { login, registration } from "../http/userAPI"
import { useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import { Context } from ".."

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation() // получаем маршрут в строке запроса
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.user = user
            user.isAuth =true
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        > 
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column mt-3"> 
                    <Form.Control className="mt-2" placeholder="Введите email..." value={email} onChange={e => setEmail(e.target.value)}/>
                    <Form.Control className="mt-2" type="password" placeholder="Введите пароль..." value={password} onChange={e => setPassword(e.target.value)}/>
                    <Button 
                        className="mt-3 align-self-center" variant="outlined" style={{border: '2px solid pink', width:200}}
                        onClick={handleClick}
                    >
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    {isLogin ? 
                        <Link className="mt-3 align-self-center" to={REGISTRATION_ROUTE}>
                            <p style={{color: 'black', textDecoration: 'underline'}}>Если нет аккаунта, то регистрация здесь</p>
                        </Link>   
                        : 
                        <Link className="mt-3 align-self-center" to={LOGIN_ROUTE}>
                            <p style={{color: 'black', textDecoration: 'underline'}}>Войти в существующий аккаунт</p>
                        </Link>  
                    }
                </Form>
            </Card>
        </Container>
    )
})

export default Auth