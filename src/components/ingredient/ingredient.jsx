import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styleIngredient from '../ingredient/ingredient.module.css';
import { useDrag } from 'react-dnd';

function Ingredient({ _id, image, name, price, count }) {
  const ingredient = { _id, image, name, price };

  const [, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: { ...ingredient },
  }));

  return (
    <div ref={dragRef} className={styleIngredient.item}>
      <Counter count={count} size="default" extraClass="m-1" />
      <img src={image} alt={name} />
      <div className={styleIngredient.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styleIngredient.title} ${'text text_type_main-default pb-8'}`}>{name}</p>
    </div>
  );
}

export default Ingredient;
