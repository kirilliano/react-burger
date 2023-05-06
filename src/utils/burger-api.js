import { createOrderRequest, createOrderSuccess, createOrderFailure } from '../services/orderSlice';
const NORMA_API = 'https://norma.nomoreparties.space/api';

export function getIngredients() {
  return fetch(`${NORMA_API}/ingredients`).then(controlApiResponse);
}

export default function controlApiResponse(res) {
  if (res.ok) {
    console.log('Control API Response:', res);
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export const submitOrder = (ingredientsIds) => async (dispatch) => {
  dispatch(createOrderRequest());
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: ingredientsIds }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const data = await response.json();
    dispatch(createOrderSuccess(data.order.number));
  } catch (error) {
    dispatch(createOrderFailure());
  }
};
