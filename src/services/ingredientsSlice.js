import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getIngredients } from '../utils/burger-api';

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  try {
    const response = await getIngredients();
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw error;
  }
});

const initialState = {
  ingredients: [],
  status: 'idle',
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    incrementCounter: (state, action) => {
      console.log('incrementCounter called with:', action.payload);
      const id = action.payload;
      const ingredient = state.ingredients.find((i) => i._id === id);
      if (ingredient) {
        ingredient.count = ingredient.count ? ingredient.count + 1 : 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { incrementCounter } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
