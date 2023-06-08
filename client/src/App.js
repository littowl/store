import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { check } from "./http/userAPI";
import Spinner from 'react-bootstrap/Spinner';

const App = observer(()  =>{
  const {user} = useContext(Context)

  // идёт загрузка или нет: когда возвращается ответ о проверке пользователя, состояние становится false и страница загружается
  const [loading, setLoading] = useState(true)

  // // отправляем запрос на проверку авторизации один раз при первом открытии приложения
  // useEffect(() => {
  //   check().then(data => {
  //     user.setuser(true)
  //     user.setIsAuth(true)
  //   }).finally(() => setLoading(false))
  // }, [])

  // if (loading) {
  //   return <Spinner animation={"border"} />
  // }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
