import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styleIngredient from '../ingredient/ingredient.module.css';

function Ingredient(props) {
  return (
    <li className={styleIngredient.item} onClick={props.onClick}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={props.image} alt={props.name} />
      <div className={styleIngredient.price}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styleIngredient.title} ${'text text_type_main-default pb-8'}`}>
        {props.name}
      </p>
    </li>
  );
}

Ingredient.propTypes = {
  onClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Ingredient;
