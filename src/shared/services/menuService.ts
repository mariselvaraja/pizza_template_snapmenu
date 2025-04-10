/**
 * Menu service for handling menu-related API calls
 */

import api, { ApiResponse } from './api';
import endpoints from '../config/endpoints';
import { environment } from '../config/endpoints';
import { MenuItem, MenuCategory } from '../redux/slices/menuSlice';

// Mock data for development
import menuData from '../../data/menu.json';

// Types for API responses
export interface MenuResponse {
  items: MenuItem[];
  categories: MenuCategory[];
}

// Helper function to flatten menu data
const flattenMenuData = (menuData: any): MenuItem[] => {
  if (!menuData || !menuData.menu) return [];
  
  // Extract all menu items from different categories
  const categories = Object.keys(menuData.menu);
  const allItems: MenuItem[] = [];
  
  categories.forEach(category => {
    const categoryItems = menuData.menu[category] || [];
    categoryItems.forEach((item: any) => {
      allItems.push({
        ...item,
        // Ensure all required fields are present
        id: item.id || 0,
        name: item.name || '',
        description: item.description || '',
        price: parseFloat(item.price) || 0,
        image: item.image || '',
        category: item.category || '',
        available: item.available !== false, // Default to true if not specified
        tags: item.tags || []
      });
    });
  });
  
  return allItems;
};

// Helper function to extract categories from menu data
const extractCategories = (menuData: any): MenuCategory[] => {
  if (!menuData || !menuData.menu) return [];
  
  // Create categories from the menu structure
  return Object.keys(menuData.menu).map(category => ({
    id: category,
    name: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize first letter
    description: `${category.charAt(0).toUpperCase() + category.slice(1)} menu items`
  }));
};

/**
 * Service for handling menu-related operations
 */
export const menuService = {
  /**
   * Fetches all menu items and categories
   */
  getMenu: async (): Promise<MenuResponse> => {
    // Use mock data in development if enabled
    if (environment.enableMockApi) {
      console.log('Using mock menu data');
      
      // Process the menu data to match our expected format
      const items = flattenMenuData(menuData);
      const categories = extractCategories(menuData);
      
      return {
        items,
        categories
      };
    }
    
    // Make API call in production or if mock is disabled
    const response = await api.get<MenuResponse>(endpoints.menu.getAll);
    return response.data;
  },

  /**
   * Fetches menu items by category
   */
  getMenuByCategory: async (category: string): Promise<MenuItem[]> => {
    // Use mock data in development if enabled
    if (environment.enableMockApi) {
      console.log(`Using mock menu data for category: ${category}`);
      
      // Filter the mock data by category
      const items = flattenMenuData(menuData);
      return items.filter((item: MenuItem) => item.category === category);
    }
    
    // Make API call in production or if mock is disabled
    const response = await api.get<MenuItem[]>(endpoints.menu.getByCategory(category));
    return response.data;
  },

  /**
   * Fetches a menu item by ID
   */
  getMenuItem: async (id: string): Promise<MenuItem> => {
    // Use mock data in development if enabled
    if (environment.enableMockApi) {
      console.log(`Using mock menu data for item: ${id}`);
      
      // Find the item by ID
      const items = flattenMenuData(menuData);
      const item = items.find((item: MenuItem) => item.id.toString() === id);
      
      if (!item) {
        throw new Error(`Menu item with ID ${id} not found`);
      }
      
      return item;
    }
    
    // Make API call in production or if mock is disabled
    const response = await api.get<MenuItem>(endpoints.menu.getById(id));
    return response.data;
  },
};

export default menuService;
