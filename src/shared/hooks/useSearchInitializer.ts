import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { searchService, SearchState } from '../services';
import menuData from '../../data/menu.json';

/**
 * Custom hook to initialize the search service with menu data
 * This hook should be used in a component that has access to the Redux store
 * and will initialize the search service when the menu data is loaded
 */
export function useSearchInitializer() {
  // Get search state from Redux store
  const searchState = useAppSelector((state) => state.search.searchState);

  // Initialize search service when component mounts
  useEffect(() => {
    // Only initialize if search is not already initialized
    if (searchState === SearchState.UNINITIALIZED) {
      console.log('Initializing search service with menu data');
      
      // Process menu data from the JSON file
      interface ProcessedItem {
        id: string;
        name: string;
        description: string;
        price: number;
        category: string;
        tags: string[];
        image: string;
        available: boolean;
      }
      
      const processedItems: ProcessedItem[] = [];
      
      // Extract items from each category
      if (menuData && menuData.menu) {
        for (const [category, items] of Object.entries(menuData.menu)) {
          if (Array.isArray(items)) {
            items.forEach(item => {
              if (item.id && item.name) {
                processedItems.push({
                  id: item.id.toString(),
                  name: item.name,
                  description: item.description || '',
                  price: typeof item.price === 'string' ? parseFloat(item.price) : item.price || 0,
                  category: category,
                  tags: item.dietary ? 
                    [
                      ...(item.dietary.isVegetarian ? ['vegetarian'] : []),
                      ...(item.dietary.isVegan ? ['vegan'] : []),
                      ...(item.dietary.isGlutenFree ? ['gluten-free'] : [])
                    ] : [],
                  image: item.image || '',
                  available: true
                });
              }
            });
          }
        }
      }
      
      console.log('Processed menu items:', processedItems.length);
      
      // Transform menu data to the format expected by the search service
      const searchData = {
        items: processedItems
      };

      // Initialize search service
      searchService.initializeIndex(searchData)
        .then(() => {
          console.log('Search service initialized successfully');
        })
        .catch((error) => {
          console.error('Failed to initialize search service:', error);
        });
    }
  }, [searchState]);

  return null;
}

export default useSearchInitializer;
