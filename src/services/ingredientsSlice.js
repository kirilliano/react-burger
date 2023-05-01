import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientsRequest: (state) => {
      // Устанавливаем состояние загрузки
      state.ingredientsLoading = true;
    },
    getIngredientsSuccess: (state, action) => {
      // Устанавливаем данные ингредиентов и сбрасываем состояние загрузки
      state.ingredients = action.payload;
      state.ingredientsLoading = false;
    },
    getIngredientsFailure: (state, action) => {
      // Устанавливаем ошибку и сбрасываем состояние загрузки
      state.ingredientsError = action.payload;
      state.ingredientsLoading = false;
    },
  },
});

export const { getIngredientsRequest, getIngredientsSuccess, getIngredientsFailure } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
