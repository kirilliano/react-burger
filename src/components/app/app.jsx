import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ConstructorContext } from '../../services/constructorContext.js';
import { getIngredients } from '../../utils/burger-api';
import style from './app.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [constructorIngredients, setConstructorIngredients] = React.useState([]);
  const [orderNumber, setOrderNumber] = React.useState(null);

  const addIngredient = (ingredient) => {
    setConstructorIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const contextValue = React.useMemo(
    () => ({
      ingredients,
      constructorIngredients,
      setConstructorIngredients,
      addIngredient,
      orderNumber,
      setOrderNumber,
    }),
    [ingredients, constructorIngredients, addIngredient, orderNumber],
  );

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

  return (
    <>
      <AppHeader />
      <main className={style.main}>
        {error ? (
          <p className={style.error}>Произошла ошибка: {error}</p>
        ) : (
          <ConstructorContext.Provider value={contextValue}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </ConstructorContext.Provider>
        )}
      </main>
    </>
  );
}

export default App;
