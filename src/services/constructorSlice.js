import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  constructorIngredients: [],
  totalPrice: 0,
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      // Реализация добавления ингредиента
      state.constructorIngredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      // Реализация удаления ингредиента
      const index = state.constructorIngredients.findIndex(
        (ingredient) => ingredient._id === action.payload._id,
      );
      if (index !== -1) {
        state.constructorIngredients.splice(index, 1);
      }
    },
    calcTotalPrice: (state) => {
      // Реализация расчета общей стоимости
      let totalPrice = 0;
      const bun = state.constructorIngredients.find((ingredient) => ingredient.type === 'bun');
      if (bun) {
        totalPrice += bun.price * 2;
      }

      state.constructorIngredients.forEach((ingredient) => {
        if (ingredient.type !== 'bun') {
          totalPrice += ingredient.price;
        }
      });

      state.totalPrice = totalPrice;
    },
  },
});

export const { addIngredient, removeIngredient, calcTotalPrice } = constructorSlice.actions;
export default constructorSlice.reducer;
