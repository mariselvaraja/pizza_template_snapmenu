import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  available: boolean;
  calories?: number;
  nutrients?: {
    protein: string;
    carbs: string;
    fat: string;
    sat: string;
    unsat: string;
    trans: string;
    sugar: string;
    fiber: string;
  };
  dietary?: {
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
  };
  allergens?: string[];
  ingredients?: string[];
  pairings?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
}

interface MenuState {
  items: MenuItem[];
  categories: MenuCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Synchronous actions
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
    setMenuCategories: (state, action: PayloadAction<MenuCategory[]>) => {
      state.categories = action.payload;
    },
    
    // Async action triggers for sagas
    fetchMenuRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMenuSuccess: (state, action: PayloadAction<{ items: MenuItem[], categories: MenuCategory[] }>) => {
      state.items = action.payload.items;
      state.categories = action.payload.categories;
      state.loading = false;
    },
    fetchMenuFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setMenuItems,
  setMenuCategories,
  fetchMenuRequest,
  fetchMenuSuccess,
  fetchMenuFailure,
} = menuSlice.actions;

export default menuSlice.reducer;
