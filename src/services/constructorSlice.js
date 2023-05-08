import { createSlice, createSelector } from '@reduxjs/toolkit';
import { incrementCounter } from '../services/ingredientsSlice';

const initialState = {
  bun: null,
  otherIngredients: [],
  totalPrice: 0,
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun: (state, action) => {
      if (!action.payload) {
        return state;
      }

      if (state.bun) {
        state.totalPrice -= state.bun.price * 2;
      }
      state.bun = { ...action.payload };
      state.totalPrice += state.bun.price * 2;
      return state;
    },
    addIngredient: (state, action) => {
      if (!Array.isArray(state.otherIngredients)) {
        state.otherIngredients = [];
      }
      return {
        ...state,
        otherIngredients: [...state.otherIngredients, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    },
    removeIngredient: (state, action) => {
      const removedIngredient = state.otherIngredients[action.payload];
      state.otherIngredients = state.otherIngredients.filter(
        (_, index) => index !== action.payload,
      );
    },
    reorderIngredients: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.otherIngredients.splice(oldIndex, 1);
      state.otherIngredients.splice(newIndex, 0, removed);
    },
  },
});

export const { setBun, addIngredient, removeIngredient, reorderIngredients } =
  constructorSlice.actions;

export const totalPrice = createSelector(
  (state) => state.constructor,
  (constructor) => {
    const bun = constructor.bun;
    const otherIngredients = constructor.otherIngredients;

    if (!otherIngredients || !Array.isArray(otherIngredients)) {
      return 0;
    }

    const bunPrice = bun ? bun.price * 2 : 0;
    const otherIngredientsPrice = otherIngredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0,
    );

    return bunPrice + otherIngredientsPrice;
  },
);

export default constructorSlice.reducer;
