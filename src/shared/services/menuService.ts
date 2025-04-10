/**
 * Menu service for handling menu-related API calls
 */

import api from './api';
import endpoints from '../config/endpoints';
import { MenuItem, MenuCategory } from '../redux/slices/menuSlice';

// Types for API responses
export interface MenuResponse {
  items: MenuItem[];
  categories: MenuCategory[];
}

// Helper function to transform API response to MenuItem format
const transformMenuItems = (apiResponse: any[]): MenuItem[] => {
  if (!apiResponse || !Array.isArray(apiResponse)) return [];
  
  return apiResponse.map(item => ({
    id: parseInt(item.sku_id.replace('CHR', '')) || 0,
    name: item.name || '',
    description: item.description || item.product_description || '',
    price: parseFloat(item.price?.replace('$', '')) || 0,
    image: item.image || '',
    category: item.level1_category || item.category || '',
    available: item.is_enabled === 'true',
    tags: extractTags(item)
  }));
};

// Helper function to extract tags from menu item
const extractTags = (item: any): string[] => {
  const tags: string[] = [];
  
  // Add subcategory as a tag if available
  if (item.subCategory) {
    tags.push(item.subCategory.toLowerCase());
  }
  
  // Add dietary information as tags
  if (item.dietary) {
    if (item.dietary.isVegan) {
      tags.push('vegan');
      tags.push('vegetarian');
    }
  }
  
  // Add ingredients as tags if available
  if (item.ingredients && Array.isArray(item.ingredients)) {
    item.ingredients.forEach((ingredient: string) => {
      if (ingredient && ingredient.trim() !== '') {
        tags.push(ingredient.trim().toLowerCase());
      }
    });
  }
  
  // Remove duplicates and return
  return [...new Set(tags)];
};

// Helper function to extract categories from menu items
const extractCategories = (menuItems: any[]): MenuCategory[] => {
  if (!menuItems || !Array.isArray(menuItems)) return [];
  
  // Get unique categories
  const uniqueCategories = [...new Set(menuItems.map(item => item.level1_category || item.category))];
  
  // Create category objects
  return uniqueCategories
    .filter(category => category) // Filter out undefined/null/empty categories
    .map(category => ({
      id: category.toLowerCase().replace(/\s+/g, '-'),
      name: category,
      description: `${category} menu items`
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
    // Make API call to get menu data
    const response = await api.get<any[]>(endpoints.menu.getAll);
    
    // Process the menu data to match our expected format
    const items = transformMenuItems(response.data);
    const categories = extractCategories(response.data);
    
    return {
      items,
      categories
    };
  },
};

export default menuService;
