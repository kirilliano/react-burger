import PropTypes from 'prop-types';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleConstructor from './burger-constructor.module.css';

function BurgerConstructor({ ingredients }) {
  return (
    <section className={styleConstructor.list}>
      <div className={styleConstructor.blockedIngredient}>
        {ingredients.map((ingredient, index) => {
          // Заблокировать верхний ингредиент
          if (index === 0) {
            return (
              <ConstructorElement
                key={ingredient._id}
                type="top"
                isLocked={true}
                text={`${ingredient.name} (верх)`}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            );
          }
        })}
      </div>

      <ul className={styleConstructor.includedIngredients}>
        {ingredients.map((ingredient, index) => {
          if (index !== 0 && index !== ingredients.length - 1) {
            return (
              <li key={ingredient._id} className={styleConstructor.item}>
                <div className={styleConstructor.dots}></div>
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            );
          }
        })}
      </ul>

      <div className={styleConstructor.blockedIngredient}>
        {ingredients.map((ingredient, index) => {
          // Заблокировать нижний ингредиент
          if (index === ingredients.length - 1) {
            return (
              <ConstructorElement
                key={ingredient._id}
                type="bottom"
                isLocked={true}
                text={`${ingredient.name} (низ)`}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            );
          }
        })}
      </div>

      <div className={styleConstructor.summary}>
        <div className={styleConstructor.value}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default BurgerConstructor;
