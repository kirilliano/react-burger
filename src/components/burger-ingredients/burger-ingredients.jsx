import React, { useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styleIngredients from './burger-ingredients.module.css';
import IngredientsBlock from '../ingredients-block/ingredients-block';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients, selectIngredients } from '../../services/ingredientsSlice';
import { addIngredient } from '../../services/constructorSlice';
import {
  setCurrentIngredient,
  clearCurrentIngredient,
} from '../../services/ingredientDetailsSlice';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');
  const [isModalOpened, setIsModalOpened] = React.useState(false);

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const currentIngredient = useSelector((state) => state.ingredientDetails.currentIngredient);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleIngredientClick = (ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
    dispatch(clearCurrentIngredient());
  };

  return (
    <section className={styleIngredients.container}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styleIngredients.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      {ingredients.length > 0 ? (
        <div className={styleIngredients.components}>
          <IngredientsBlock
            title="Булки"
            ingredients={ingredients}
            type="bun"
            onClick={handleIngredientClick}
          />
          <IngredientsBlock
            title="Соусы"
            ingredients={ingredients}
            type="sauce"
            onClick={handleIngredientClick}
          />
          <IngredientsBlock
            title="Начинки"
            ingredients={ingredients}
            type="main"
            onClick={handleIngredientClick}
          />
        </div>
      ) : (
        <div className="text text_type_main-medium">Загрузка ингредиентов...</div>
      )}
      {isModalOpened && (
        <Modal onClose={closeModal}>
          <IngredientDetails currentIngredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
