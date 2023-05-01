import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIngredient: null,
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      // Устанавливаем текущий ингредиент
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      // Очищаем текущий ингредиент
      state.currentIngredient = null;
    },
  },
});

export const { setCurrentIngredient, clearCurrentIngredient } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
