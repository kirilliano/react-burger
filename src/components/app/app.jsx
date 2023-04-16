import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ConstructorContext } from '../../services/constructorContext.js';
import { getIngredients } from '../../utils/burger-api';
import style from './app.module.css';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [constructorIngredients, setConstructorIngredients] = React.useState([]);
  const [orderNumber, setOrderNumber] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      getIngredients()
        .then((data) => {
          setIngredients(data.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
    fetchData();
  }, []);

  const addIngredient = (ingredient) => {
    setConstructorIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  return (
    <>
      <AppHeader />
      <main className={style.main}>
        {error ? (
          <p className={style.error}>Произошла ошибка: {error}</p>
        ) : (
          <ConstructorContext.Provider
            value={{
              constructorIngredients,
              setConstructorIngredients,
              addIngredient,
              orderNumber,
              setOrderNumber,
            }}
          >
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={constructorIngredients} />
          </ConstructorContext.Provider>
        )}
      </main>
    </>
  );
}

export default App;
