import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';
import styleBlock from '../ingredients-block/ingredients-block.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';

function IngredientsBlock({ title, ingredients, type, onClick }) {
  return (
    <div>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={styleBlock.block}>
        {ingredients.map((ingredient) => {
          if (ingredient.type === type) {
            return (
              <Ingredient
                key={ingredient._id}
                {...ingredient}
                onClick={() => onClick(ingredient)}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}

IngredientsBlock.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientsBlock;
