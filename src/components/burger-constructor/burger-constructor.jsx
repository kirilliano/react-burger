import React, { useCallback } from 'react';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleConstructor from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-detail';
import { useSelector, useDispatch } from 'react-redux';
import { createOrderAsync } from '../../services/orderSlice';
import {
  setBun,
  addIngredient,
  removeIngredient,
  totalPrice,
} from '../../services/constructorSlice';
import { useDrop } from 'react-dnd';
import { incrementCounter, decrementCounter } from '../../services/ingredientsSlice';

function BurgerConstructor() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const currentTotalPrice = useSelector(totalPrice);
  const orderStatus = useSelector((state) => state.order.status);
  const orderNumber = useSelector((state) => state.order.orderNumber);

  const { otherIngredients } = useSelector((state) => state.constructor);
  const bun = useSelector((state) => state.constructor.bun);

  const handleOrderClick = () => {
    if (!bun) {
      alert('Добавьте булку в заказ!');
      return;
    }
    dispatch(
      createOrderAsync([
        { ...bun, position: 'top' },
        ...otherIngredients,
        { ...bun, position: 'bottom' },
      ]),
    );
    setIsModalOpen(true);
  };

  const onDrop = useCallback(
    (item) => {
      console.log('Item dropped:', item);
      console.log('Item type:', item.type);
      if (item.type === 'bun') {
        console.log('Adding a bun');
        dispatch(setBun(item));
        dispatch(incrementCounter(item._id));
        if (bun) {
          dispatch(decrementCounter(bun._id));
        }
      } else {
        console.log('Adding another ingredient:');
        dispatch(addIngredient(item));
        dispatch(incrementCounter(item._id));
      }
    },
    [dispatch, bun],
  );

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      onDrop(item);
    },
  });

  return (
    <section className={styleConstructor.list} ref={dropRef}>
      {otherIngredients?.length === 0 ? <p>Ваш заказ пуст</p> : null}
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
        {otherIngredients?.map((ingredient, index) => {
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
          <p className="text text_type_digits-medium">{currentTotalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>

      {isModalOpen && orderStatus === 'succeeded' && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
