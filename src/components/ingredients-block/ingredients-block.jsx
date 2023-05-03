import Ingredient from '../ingredient/ingredient';
import styleBlock from '../ingredients-block/ingredients-block.module.css';

function IngredientsBlock({ title, ingredients, type, onClick }) {
  const filteredIngredients =
    ingredients && ingredients.filter((ingredient) => ingredient.type === type);

  return (
    <div>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={styleBlock.block}>
        {filteredIngredients &&
          filteredIngredients.map((ingredient) => (
            <Ingredient key={ingredient._id} {...ingredient} onClick={() => onClick(ingredient)} />
          ))}
      </ul>
    </div>
  );
}

export default IngredientsBlock;
