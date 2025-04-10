import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import menuReducer from './slices/menuSlice';
import siteContentReducer from './slices/siteContentSlice';
import searchReducer from './slices/searchSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
  siteContent: siteContentReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
