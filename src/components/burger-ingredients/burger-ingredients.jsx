import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientsBlock from '../ingredients-block/ingredients-block';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('');

  return (
    <section className={styles.box}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="filling" active={current === 'filling'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.components}>
        <IngredientsBlock title="Булки" ingredients={props.ingredients} type="bun" />
        <IngredientsBlock title="Соусы" ingredients={props.ingredients} type="sauce" />
        <IngredientsBlock title="Начинки" ingredients={props.ingredients} type="main" />
      </div>
    </section>
  );
}

export default BurgerIngredients;
