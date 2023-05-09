import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styleIngredient from '../ingredient/ingredient.module.css';
import { useDrag } from 'react-dnd';
import { ingredientType } from '../../utils/types';
import PropTypes from 'prop-types';

function Ingredient({ ingredient, count }) {
  const { _id, image, name, price, type } = ingredient;

  const [, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: { ...ingredient },
  }));

  return (
    <div ref={dragRef} className={styleIngredient.item}>
      <Counter count={count} size="default" extraClass="m-1" />
      <img src={image} alt={name} />
      <div className={styleIngredient.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styleIngredient.title} ${'text text_type_main-default pb-8'}`}>{name}</p>
    </div>
  );
}

Ingredient.propTypes = {
  ingredient: PropTypes.shape(ingredientType).isRequired,
  count: PropTypes.number,
};

export default Ingredient;
