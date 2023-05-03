import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';
import styleBlock from '../ingredients-block/ingredients-block.module.css';

const IngredientsBlock = forwardRef(({ title, ingredients, type, onClick }, ref) => {
  const filteredIngredients =
    ingredients && ingredients.filter((ingredient) => ingredient.type === type);

  return (
    <section ref={ref} className={styleBlock.container}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={styleBlock.block}>
        {filteredIngredients &&
          filteredIngredients.map((ingredient) => (
            <Ingredient key={ingredient._id} {...ingredient} onClick={() => onClick(ingredient)} />
          ))}
      </ul>
    </section>
  );
});

IngredientsBlock.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientsBlock;
