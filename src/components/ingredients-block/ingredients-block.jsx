import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';
import styleBlock from '../ingredients-block/ingredients-block.module.css';
import { ingredientType } from '../../utils/types';

const IngredientsBlock = forwardRef(({ title, ingredients, type, onClick }, ref) => {
  const filteredIngredients =
    ingredients && ingredients.filter((ingredient) => ingredient.type === type);

  return (
    <section ref={ref} className={styleBlock.container}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={styleBlock.block}>
        {filteredIngredients &&
          filteredIngredients.map((ingredient) => (
            <li key={ingredient._id}>
              <div onClick={() => onClick(ingredient)}>
                <Ingredient ingredient={ingredient} count={ingredient.count} />
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
});

IngredientsBlock.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientsBlock;
