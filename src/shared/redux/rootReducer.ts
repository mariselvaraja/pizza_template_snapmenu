import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import menuReducer from './slices/menuSlice';
import siteContentReducer from './slices/siteContentSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
  siteContent: siteContentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
