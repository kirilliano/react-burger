import { createSlice, createSelector } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
        return { ...state };
      }

      let newTotalPrice = state.totalPrice;
      if (state.bun) {
        newTotalPrice -= state.bun.price * 2;
      }

      const newBun = { ...action.payload };
      newTotalPrice += newBun.price * 2;

      return {
        ...state,
        bun: newBun,
        totalPrice: newTotalPrice,
      };
    },
    addIngredient: (state, action) => {
      if (!Array.isArray(state.otherIngredients)) {
        state.otherIngredients = [];
      }
      state.otherIngredients.push({ ...action.payload });
      state.totalPrice += action.payload.price;
    },
    removeIngredient: (state, action) => {
      const removedIngredient = state.otherIngredients[action.payload];
      state.otherIngredients = state.otherIngredients.filter(
        (_, index) => index !== action.payload,
      );
      state.totalPrice -= removedIngredient.price;
    },
    moveIngredient: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.otherIngredients.splice(fromIndex, 1);
      state.otherIngredients.splice(toIndex, 0, removed);
    },
  },
});

export const { setBun, addIngredient, removeIngredient, reorderIngredients, moveIngredient } =
  constructorSlice.actions;

export const totalPrice = createSelector(
  (state) => state.constructor,
  (constructor) => {
    const bun = constructor.bun;
    const otherIngredients = constructor.otherIngredients;

    if (!otherIngredients || !Array.isArray(otherIngredients)) {
      return bun && bun.price * 2;
    }

    const bunPrice = bun ? bun.price * 2 : 0;
    const otherIngredientsPrice = otherIngredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0,
    );

    return bunPrice + otherIngredientsPrice;
  },
);

export const addIngredientWithUuid = (ingredient) => (dispatch) => {
  const ingredientWithUuid = { ...ingredient, uniqueId: uuidv4() };
  console.log('uniqueId:', ingredientWithUuid.uniqueId);
  dispatch(addIngredient(ingredientWithUuid));
};

export default constructorSlice.reducer;
