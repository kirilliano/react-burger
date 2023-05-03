import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsSlice';
import constructorReducer from './constructorSlice';
import ingredientDetailsReducer from './ingredientDetailsSlice';
import orderReducer from './orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
});

export default rootReducer;
