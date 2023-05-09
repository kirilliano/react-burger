import { createOrderRequest, createOrderSuccess, createOrderFailure } from '../services/orderSlice';
const NORMA_API = 'https://norma.nomoreparties.space/api';

export function getIngredients() {
  return fetch(`${NORMA_API}/ingredients`).then(controlApiResponse);
}

export default function controlApiResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export const submitOrder = async (orderData) => {
  const response = await fetch('https://norma.nomoreparties.space/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: orderData }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit order');
  }

  const data = await response.json();
  return { orderNumber: data.order.number };
};
