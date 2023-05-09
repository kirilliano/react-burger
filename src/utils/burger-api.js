const BASE_URL = 'https://norma.nomoreparties.space/api';

export function getIngredients() {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .catch((error) => {
      console.error(`Ошибка при получении ингредиентов: ${error}`);
      throw error;
    });
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const submitOrder = (orderData) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: orderData }),
  })
    .then(checkResponse)
    .then((data) => {
      return { orderNumber: data.order.number };
    })
    .catch((error) => {
      console.error(`Ошибка при отправке заказа: ${error}`);
      throw error;
    });
};
