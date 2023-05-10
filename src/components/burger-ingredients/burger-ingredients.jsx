import React, { useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styleIngredients from './burger-ingredients.module.css';
import IngredientsBlock from '../ingredients-block/ingredients-block';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/ingredientsSlice';
import {
  setCurrentIngredient,
  clearCurrentIngredient,
} from '../../services/ingredientDetailsSlice';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');
  const [sectionOffsets, setSectionOffsets] = React.useState([]);
  const [isModalOpened, setIsModalOpened] = React.useState(false);

  const currentIngredient = useSelector((state) => state.ingredientDetails.currentIngredient);
  const dispatch = useDispatch();

  const { ingredients, status, error } = useSelector((state) => state.ingredients);

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const getSectionOffsets = () => {
    return [
      { id: 'bun', top: bunsRef.current.offsetTop },
      { id: 'sauce', top: saucesRef.current.offsetTop },
      { id: 'main', top: mainsRef.current.offsetTop },
    ];
  };

  useEffect(() => {
    if (ingredients.length > 0) {
      setSectionOffsets(getSectionOffsets());
    }
  }, [ingredients]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIngredients());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const ingredientsContainer = document.querySelector('#ingredientsContainer');
    if (ingredientsContainer) {
      ingredientsContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ingredientsContainer) {
        ingredientsContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [sectionOffsets]);

  if (status === 'loading') {
    return <p className="text text_type_main-large mt-10">Загрузка ингредиентов...</p>;
  }

  if (status === 'failed') {
    return <p className="text text_type_main-large mt-10">Ошибка загрузки ингредиентов: {error}</p>;
  }

  const handleIngredientClick = (ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
    dispatch(clearCurrentIngredient());
  };

  const handleScroll = () => {
    const scrollPosition = document.querySelector('#ingredientsContainer').scrollTop;
    const currentSection = sectionOffsets.reduce((prev, curr) => {
      return Math.abs(curr.top - scrollPosition) < Math.abs(prev.top - scrollPosition)
        ? curr
        : prev;
    });
    setCurrent(currentSection.id);
  };

  return (
    <section className={styleIngredients.container}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styleIngredients.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      {ingredients.length > 0 ? (
        <div id="ingredientsContainer" className={styleIngredients.components}>
          <IngredientsBlock
            title="Булки"
            ingredients={ingredients}
            type="bun"
            onClick={handleIngredientClick}
            ref={bunsRef}
          />
          <IngredientsBlock
            title="Соусы"
            ingredients={ingredients}
            type="sauce"
            onClick={handleIngredientClick}
            ref={saucesRef}
          />
          <IngredientsBlock
            title="Начинки"
            ingredients={ingredients}
            type="main"
            onClick={handleIngredientClick}
            ref={mainsRef}
          />
        </div>
      ) : (
        <div className="text text_type_main-medium">Загрузка ингредиентов...</div>
      )}
      {isModalOpened && (
        <Modal onClose={closeModal}>
          <IngredientDetails currentIngredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
