import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import style from './app.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from '../../services/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { addIngredient } from '../../services/constructorSlice';

function App() {
  const dispatch = useDispatch();
  const { ingredients, status, error } = useSelector((state) => state.ingredients);
  console.log('Ingredients in Redux Store:', ingredients);
  const constructorIngredients = useSelector((state) => state.ingredients.ingredients);
  const [orderNumber, setOrderNumber] = React.useState(null);

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={style.main}>
        {error ? (
          <p className={style.error}>Произошла ошибка: {error}</p>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </>
  );
}

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WrappedApp;
