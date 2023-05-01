import Ingredient from '../ingredient/ingredient';
import styleBlock from '../ingredients-block/ingredients-block.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIngredientsByType, addIngredient } from '../../services/ingredientsSlice';

function IngredientsBlock({ title, type }) {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredientsByType(type));

  const handleIngredientClick = (ingredient) => {
    dispatch(addIngredient(ingredient));
  };

  return (
    <div>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={styleBlock.block}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            {...ingredient}
            onClick={() => handleIngredientClick(ingredient)}
          />
        ))}
      </ul>
    </div>
  );
}

export default IngredientsBlock;
