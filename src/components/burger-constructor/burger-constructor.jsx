import React from 'react';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleConstructor from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorContext } from '../../services/constructorContext';
import { calcTotalPrice } from '../../services/burgerSlice';
import { useSelector } from 'react-redux';

function BurgerConstructor() {
  const { bun, ingredients } = useSelector((state) => state.burger);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { orderNumber, setOrderNumber } = React.useContext(ConstructorContext);
  const totalPrice = useSelector(calcTotalPrice);

  function submitOrder() {
    const ingredientIds = ingredients.map((ingredient) => ingredient._id);

    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: ingredientIds,
        bun: bun._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsModalOpen(true);
          setOrderNumber(data.order.number);
        } else {
          console.log('Что-то пошло не так');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleOrderClick = () => {
    submitOrder();
  };

  return (
    <section className={styleConstructor.list}>
      {bun && (
        <div className={styleConstructor.blockedIngredient}>
          <ConstructorElement
            key={bun._id}
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      <ul className={styleConstructor.includedIngredients}>
        {ingredients.map((ingredient, index) => {
          if (ingredient.type !== 'bun') {
            return (
              <li key={`${ingredient._id}-${index}`} className={styleConstructor.item}>
                <div className={styleConstructor.dots}></div>
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            );
          }
          return null;
        })}
      </ul>

      {bun && (
        <div className={styleConstructor.blockedIngredient}>
          <ConstructorElement
            key={`${bun._id}-bottom`}
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      <div className={styleConstructor.summary}>
        <div className={styleConstructor.value}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
