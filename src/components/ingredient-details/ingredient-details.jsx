import PropTypes from 'prop-types';
import styleDetails from '../ingredient-details/ingredient-details.module.css';

function IngredientDetails({ currentIngredient }) {
  const { image_large, name, calories, proteins, fat, carbohydrates } = currentIngredient;
  return (
    <>
      <div className={styleDetails.title}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
      </div>
      <div className={styleDetails.container}>
        <img src={image_large} alt={name} className={styleDetails.image} />
        <p className="text text_type_main-medium mt-4">{name}</p>
        <ul className={styleDetails.nutrients}>
          <li className={styleDetails.nutrient}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{calories / 10}</p>
          </li>
          <li className={styleDetails.nutrient}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{proteins / 10}</p>
          </li>
          <li className={styleDetails.nutrient}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{fat / 10}</p>
          </li>
          <li className={styleDetails.nutrient}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">
              {carbohydrates / 10}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  currentIngredient: PropTypes.shape({
    image_large: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
  }),
};

export default IngredientDetails;
