/**
 * Site content service for handling site content-related API calls
 */

import api, { ApiResponse } from './api';
import endpoints from '../config/endpoints';
import { environment } from '../config/endpoints';
import { SiteContent } from '../redux/slices/siteContentSlice';

/**
 * Service for handling site content-related operations
 */
export const siteContentService = {
  /**
   * Fetches all site content
   */
  getSiteContent: async (): Promise<SiteContent> => {
    try {
      // Make API call to get site content data
      const response = await api.get<any>(endpoints.siteContent.getAll);
      
      // Process the API response to match our expected format
      const data = response.data;
      
      // Create a properly structured SiteContent object
      const transformedData: SiteContent = {
        about: {
          story: data.story?.hero?.description || '',
          team: data.story?.values?.map((value: any) => ({
            name: value.title || '',
            role: value.icon || '',
            bio: value.description || '',
            image: ''  // Default empty as it's not in the source data
          })) || []
        },
        gallery: data.gallery?.images?.map((image: any, index: number) => ({
          id: index + 1,
          title: image.title || '',
          image: image.image || '',
          description: image.description || ''
        })) || [],
        events: data.events?.items?.map((event: any, index: number) => ({
          id: index + 1,
          title: event.title || '',
          date: event.date || '',
          description: event.description || '',
          image: event.image || ''
        })) || [],
        blog: data.blog?.posts?.map((post: any, index: number) => ({
          id: index + 1,
          title: post.title || '',
          date: post.date || '',
          author: post.chef || '',
          content: post.content || '',
          image: post.image || '',
          excerpt: post.subtitle || ''
        })) || [],
        reservation: {
          title: data.reservation?.header?.title || '',
          description: data.reservation?.header?.description || '',
          image: ''  // Default empty as it's not in the source data
        },
        contact: {
          address: data.contact?.infoCards?.address?.street + ', ' + 
                  data.contact?.infoCards?.address?.city + ', ' + 
                  data.contact?.infoCards?.address?.state || '',
          phone: data.contact?.infoCards?.phone?.numbers?.[0] || '',
          email: data.contact?.infoCards?.email?.addresses?.[0] || '',
          hours: data.contact?.infoCards?.hours?.weekday + '; ' + 
                data.contact?.infoCards?.hours?.weekend || '',
          image: ''  // Default empty as it's not in the source data
        },
        locations: [{
          id: 1,
          name: data.contact?.infoCards?.address?.label || 'Main Location',
          address: data.contact?.infoCards?.address?.street + ', ' + 
                  data.contact?.infoCards?.address?.city + ', ' + 
                  data.contact?.infoCards?.address?.state || '',
          phone: data.contact?.infoCards?.phone?.numbers?.[0] || '',
          hours: data.contact?.infoCards?.hours?.weekday + '; ' + 
                data.contact?.infoCards?.hours?.weekend || '',
          image: '',  // Default empty as it's not in the source data
          coordinates: {
            lat: 40.7128,  // Default to NYC coordinates
            lng: -74.0060
          }
        }]
      };
      
      return transformedData;
    } catch (error) {
      console.error('Error fetching site content:', error);
      throw error;
    }
  },

  /**
   * Fetches a specific section of the site content
   */
  getSiteContentSection: async (section: string): Promise<any> => {
    try {
      // Make API call to get the specific section
      const response = await api.get<any>(endpoints.siteContent.getSection(section));
      return response.data;
    } catch (error) {
      console.error(`Error fetching site content section ${section}:`, error);
      throw error;
    }
  },
};

export default siteContentService;
