import React, { forwardRef } from 'react';
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
            <li key={ingredient._id}>
              <div onClick={() => onClick(ingredient)}>
                <Ingredient
                  _id={ingredient._id}
                  image={ingredient.image}
                  name={ingredient.name}
                  price={ingredient.price}
                  count={ingredient.count}
                  type={ingredient.type}
                />
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
});

export default IngredientsBlock;
