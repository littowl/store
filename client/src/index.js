import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import ToyStore from './store/ToyStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null) // оборачиваем приложение в провайдер этого контекста
console.log(process.env.REACT_APP_API_URL)

root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(), // передаём объект класса UserStore
      toy: new ToyStore(),
    }}>
      <App />
    </Context.Provider>
    
  </React.StrictMode>
);

