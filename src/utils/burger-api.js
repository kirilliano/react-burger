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
