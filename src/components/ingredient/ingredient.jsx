import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styleIngredient from '../ingredient/ingredient.module.css';
import { useDrag } from 'react-dnd';

function Ingredient({ _id, image, name, price, count, type }) {
  const ingredient = { _id, image, name, price, type };

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
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number,
  type: PropTypes.string.isRequired,
};

export default Ingredient;
