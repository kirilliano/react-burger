import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitOrder as postOrder } from '../utils/burger-api';

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await postOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderNumber: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderNumber = action.payload.orderNumber;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
