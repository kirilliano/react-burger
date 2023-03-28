import Ingredient from '../ingredient/ingredient';
import styles from '../burger-ingredients/burger-ingredients.module.css';

function IngredientsBlock(props) {
  return (
    <div>
      <h2 className="text text_type_main-medium">{props.title}</h2>
      <ul className={styles.block}>
        {props.ingredients.map((ingredient) => {
          if (ingredient.type === props.type) {
            return <Ingredient key={ingredient._id} {...ingredient} />;
          }
        })}
      </ul>
    </div>
  );
}

export default IngredientsBlock;
