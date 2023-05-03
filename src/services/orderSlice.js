import { createSlice } from '@reduxjs/toolkit';
import { submitOrder } from '../utils/burger-api';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderNumber: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    createOrderRequest: (state) => {
      state.isLoading = true;
    },
    createOrderSuccess: (state, action) => {
      state.orderNumber = action.payload;
      state.isLoading = false;
    },
    createOrderFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { createOrderRequest, createOrderSuccess, createOrderFailure } = orderSlice.actions;

export const createOrderAsync = (orderData) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const orderNumber = await submitOrder(orderData);
    dispatch(createOrderSuccess(orderNumber));
  } catch (error) {
    dispatch(createOrderFailure(error.message));
  }
};

export default orderSlice.reducer;
