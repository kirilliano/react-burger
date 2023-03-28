import React from 'react';
import AppHeader from '../app-header/app-header';
import style from './app.module.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      return await fetch(URL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((data) => setIngredients(data.data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  return (
    <>
      <AppHeader />
      <BurgerIngredients ingredients={ingredients} />
    </>
  );
}

export default App;
