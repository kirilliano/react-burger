import { createSlice } from '@reduxjs/toolkit';
import { submitOrder as postOrder } from '../utils/burger-api';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderNumber: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    createOrderRequest: (state) => {
      state.status = 'loading';
    },
    createOrderSuccess: (state, action) => {
      state.status = 'succeeded';
      state.orderNumber = action.payload.orderNumber;
    },
    createOrderFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { createOrderRequest, createOrderSuccess, createOrderFailure } = orderSlice.actions;

export const createOrderAsync = (orderData) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const response = await postOrder(orderData);
    dispatch(createOrderSuccess(response));
  } catch (error) {
    dispatch(createOrderFailure(error.message));
  }
};

export default orderSlice.reducer;
