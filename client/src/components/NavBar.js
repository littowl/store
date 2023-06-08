import { useContext } from "react"
import { Context } from ".."
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import {observer} from 'mobx-react-lite'
import { useNavigate } from "react-router-dom";

// чтобы компонент мог отслеживать изменения в состоянии юзера - оборачиваем в observer
const NavBar = observer(() => {
    const {user} = useContext(Context) // получаем пользователя из контекста
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <Navbar style={{background: 'pink', boxShadow:'0px 1px 10px white'}}>
        <Container className="mx-10">
            <Nav.Link href={SHOP_ROUTE}>React Toys</Nav.Link>
            {user.isAuth ? 
                <Nav className="ml-auto">
                    <Button variant="outline-dark" className="mx-2" onClick={() => logOut()}>Выйти</Button>
                    <Button variant="outline-dark" onClick={() => navigate(ADMIN_ROUTE)}>Администратор</Button>
                </Nav>
            :
                <Nav className="ml-auto">
                    <Button variant="outline-dark" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
            }
          
        </Container>
      </Navbar>
    )
})

export default NavBar