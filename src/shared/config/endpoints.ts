/**
 * Endpoint configuration for the application
 * This file centralizes all API endpoint paths
 */

// Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// API paths from environment variables
const MENU_API_PATH = import.meta.env.VITE_MENU_VIEW_API_PATH || '/getMenuJson';
const SITE_CONTENT_API_PATH = import.meta.env.VITE_SITE_CONTENT_VIEW_API_PATH || '/getSiteContentJson';
const CART_API_PATH = import.meta.env.VITE_CART_API_PATH || '/cart';
const PLACE_ORDER_API_PATH = import.meta.env.VITE_PLACE_ORDER_API_PATH || '/placeOrder';

// Endpoint configuration object
export const endpoints = {
  // Menu endpoints
  menu: {
    getAll: `${API_BASE_URL}${MENU_API_PATH}`,
  },
  
  // Site content endpoints
  siteContent: {
    getAll: `${API_BASE_URL}${SITE_CONTENT_API_PATH}`,
    getSection: (section: string) => `${API_BASE_URL}${SITE_CONTENT_API_PATH}/${section}`,
  },
  
  // Cart endpoints
  cart: {
    get: `${API_BASE_URL}${CART_API_PATH}`,
    add: `${API_BASE_URL}${CART_API_PATH}/add`,
    remove: (id: number) => `${API_BASE_URL}${CART_API_PATH}/remove/${id}`,
    update: `${API_BASE_URL}${CART_API_PATH}/update`,
    clear: `${API_BASE_URL}${CART_API_PATH}/clear`,
    placeOrder: `${API_BASE_URL}${PLACE_ORDER_API_PATH}`,
  },
};

// Environment configuration
export const environment = {
  isDevelopment: import.meta.env.VITE_ENV === 'development',
  isTest: import.meta.env.VITE_ENV === 'test',
  isProduction: import.meta.env.VITE_ENV === 'production',
  enableMockApi: import.meta.env.VITE_ENABLE_MOCK_API === 'true',
};

export default endpoints;
