import Ingredient from '../ingredient/ingredient';
import styleBlock from '../ingredients-block/ingredients-block.module.css';

function IngredientsBlock(props) {
  return (
    <div>
      <h2 className="text text_type_main-medium">{props.title}</h2>
      <ul className={styleBlock.block}>
        {props.ingredients.map((ingredient) => {
          if (ingredient.type === props.type) {
            return (
              <Ingredient
                key={ingredient._id}
                {...ingredient}
                onClick={() => props.onClick(ingredient)}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}

export default IngredientsBlock;
