export default function reducer(state, action) {
  switch (action.type) {
    case 'CALC_TOTAL_PRICE':
      let totalPrice = 0;
      const bun = action.constructorIngredients.find((ingredient) => ingredient.type === 'bun');
      if (bun) {
        totalPrice += bun.price * 2;
      }

      action.constructorIngredients.forEach((ingredient) => {
        if (ingredient.type !== 'bun') {
          totalPrice += ingredient.price;
        }
      });

      return {
        ...state,
        totalPrice: totalPrice,
      };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}
