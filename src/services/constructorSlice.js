import { createSlice, createSelector } from '@reduxjs/toolkit';
import { incrementCounter } from '../services/ingredientsSlice';
const initialState = {
  ingredients: [],
  totalPrice: 0,
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (!Array.isArray(state.ingredients)) {
        state.ingredients = [];
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    },
    removeIngredient: (state, action) => {
      const removedIngredient = state.ingredients[action.payload];
      state.ingredients = state.ingredients.filter((_, index) => index !== action.payload);
      state.totalPrice -= removedIngredient.price;
    },
    reorderIngredients: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.ingredients.splice(oldIndex, 1);
      state.ingredients.splice(newIndex, 0, removed);
    },
    incrementConstructorCounter: (state, action) => {
      const id = action.payload;
      const ingredient = state.ingredients.find((i) => i._id === id);
      if (ingredient) {
        ingredient.count = ingredient.count ? ingredient.count + 1 : 1;
      }
    },
  },
});

export const { addIngredient, removeIngredient, reorderIngredients, incrementConstructorCounter } =
  constructorSlice.actions;

export const totalPrice = createSelector(
  (state) => state.constructor.ingredients,
  (ingredients) => {
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun');
    const bunPrice = bun ? bun.price * 2 : 0;
    const otherIngredientsPrice = ingredients
      .filter((ingredient) => ingredient.type !== 'bun')
      .reduce((sum, ingredient) => sum + ingredient.price, 0);
    return bunPrice + otherIngredientsPrice;
  },
);

export default constructorSlice.reducer;
