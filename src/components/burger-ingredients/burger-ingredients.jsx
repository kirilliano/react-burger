import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styleIngredients from './burger-ingredients.module.css';
import IngredientsBlock from '../ingredients-block/ingredients-block';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { selectIngredients, addIngredient } from '../../services/ingredientsSlice';
import {
  setCurrentIngredient,
  closeModal,
  selectCurrentIngredient,
  selectIsModalOpened,
} from '../../services/ingredientDetailsSlice';

function BurgerIngredients() {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const currentIngredient = useSelector(selectCurrentIngredient);
  const isModalOpened = useSelector(selectIsModalOpened);
  const [current, setCurrent] = useState('bun');

  const handleIngredientClick = (ingredient) => {
    dispatch(addIngredient(ingredient));
    dispatch(setCurrentIngredient(ingredient));
    dispatch(closeModal(true));
  };

  const handleCloseModal = () => {
    dispatch(closeModal(false));
    dispatch(setCurrentIngredient(null));
  };

  return (
    <section className={styleIngredients.container}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styleIngredients.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={() => setCurrent('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => setCurrent('sauce')}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={() => setCurrent('main')}>
          Начинки
        </Tab>
      </div>
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
      {isModalOpened && (
        <Modal onClose={handleCloseModal}>
          <IngredientDetails currentIngredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
