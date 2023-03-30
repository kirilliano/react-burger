import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styleIngredients from './burger-ingredients.module.css';
import IngredientsBlock from '../ingredients-block/ingredients-block';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('');

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
        <IngredientsBlock title="Булки" ingredients={props.ingredients} type="bun" />
        <IngredientsBlock title="Соусы" ingredients={props.ingredients} type="sauce" />
        <IngredientsBlock title="Начинки" ingredients={props.ingredients} type="main" />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default BurgerIngredients;
