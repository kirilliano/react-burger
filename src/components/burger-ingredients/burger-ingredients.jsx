import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styleIngredients from './burger-ingredients.module.css';
import IngredientsBlock from '../ingredients-block/ingredients-block';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientPropTypes } from '../../utils/prop-types';
import { ConstructorContext } from '../../services/constructorContext.js';

function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = React.useState('bun');
  const [currentIngredient, setCurrentIngredient] = React.useState(null);
  const [isModalOpened, setIsModalOpened] = React.useState(false);
  const { addIngredient } = React.useContext(ConstructorContext);

  const handleIngredientClick = (ingredient) => {
    addIngredient(ingredient);
    setCurrentIngredient(ingredient);
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
    setCurrentIngredient(null);
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
        <Modal onClose={closeModal}>
          <IngredientDetails currentIngredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerIngredients;
