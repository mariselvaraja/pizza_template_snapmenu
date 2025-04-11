import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/redux';
import { fetchSiteContentRequest, SiteContent } from '../shared/redux/slices/siteContentSlice';

// Define types for the UI site content structure
export interface UISiteContent {
  navigationBar: {
    brand: {
      name: string;
      logo: {
        icon: string;
        text: string;
      }
    };
    navigation: {
      links: Array<{
        label: string;
        path: string;
        isEnabled: boolean;
      }>;
    };
    hero: {
      banners: Array<{
        image: string;
        title: string;
        subtitle: string;
      }>;
      autoPlayInterval: number;
    };
    experience: {
      section: {
        title: string;
        subtitle: string;
      };
      cards: Array<{
        icon: string;
        title: string;
        description: string;
        image: string;
      }>;
    };
  };
  story?: {
    hero: {
      image: string;
      title: string;
      description: string;
    };
    values: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  blog?: {
    header: {
      title: string;
      description: string;
    };
    posts: Array<{
      id: string;
      title: string;
      subtitle: string;
      content: string;
      image: string;
      videoThumbnail: string;
      videoUrl: string;
      chef: string;
      date: string;
      readTime: string;
    }>;
  };
  reservation?: {
    header: {
      title: string;
      description: string;
    };
    info: {
      hours: {
        weekdays: {
          label: string;
          time: string;
        };
        weekends: {
          label: string;
          time: string;
        };
        sunday: {
          label: string;
          time: string;
        };
      };
      location: {
        street: string;
        area: string;
        city: string;
        state: string;
        zip: string;
      };
      contact: {
        phone: string;
      };
      note: string;
    };
    form: {
      labels: {
        date: string;
        time: string;
        guests: string;
        name: string;
        email: string;
        phone: string;
        specialRequests: string;
      };
      placeholders: {
        name: string;
        email: string;
        phone: string;
        specialRequests: string;
      };
    };
  };
  gallery?: {
    section: {
      title: string;
      subtitle: string;
    };
    images: Array<{
      image: string;
      title: string;
      description: string;
    }>;
  };
  events?: {
    section: {
      title: string;
      subtitle: string;
    };
    items: Array<{
      image: string;
      title: string;
      description: string;
      date: string;
      time: string;
      location: string;
    }>;
  };
  contact?: {
    header: {
      title: string;
      subtitle: string;
    };
    infoCards: {
      phone: {
        title: string;
        numbers: string[];
        hours: string;
      };
      email: {
        title: string;
        addresses: string[];
        support: string;
      };
      address: {
        title: string;
        street: string;
        city: string;
        state: string;
        zip: string;
        label: string;
      };
      hours: {
        title: string;
        weekday: string;
        weekend: string;
        note: string;
      };
    };
    form: {
      title: string;
      description: string;
      labels: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
        submitButton: string;
      };
      placeholders: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
      };
    };
    callToAction: {
      call: {
        title: string;
        phone: string;
      };
      email: {
        title: string;
        address: string;
      };
      visit: {
        title: string;
        address: string;
      };
    };
    location: {
      title: string;
      description: string;
      mapEnabled: boolean;
    };
  };
  footer: {
    newsletter: {
      title: string;
      description: string;
    };
    servicesSection: {
      title: string;
      links: Array<{
        label: string;
        url: string;
      }>;
    };
    copyright: {
      text: string;
    };
    social: {
      links: Array<{
        icon: string;
        url: string;
      }>;
    };
  };
}


// Create the context with proper typing
export const SiteContentContext = createContext<UISiteContent | undefined>(undefined);

// Props for the provider component
interface SiteContentProviderProps {
  children: ReactNode;
}

// Provider component that will wrap the app
export function SiteContentProvider({ children }: SiteContentProviderProps) {
  const dispatch = useAppDispatch();
  const { content, rawApiResponse, loading, error } = useAppSelector(state => state.siteContent);
  const [siteContent, setSiteContent] = useState<UISiteContent | undefined>(undefined);

  // Fetch site content data when the component mounts
  useEffect(() => {
    dispatch(fetchSiteContentRequest());
  }, [dispatch]);

  // Transform API data to UI format when content changes
  useEffect(() => {
    if (content && rawApiResponse) {
      try {
        // Check if data is already an object or needs parsing
        let data;
        if (typeof rawApiResponse.data === 'string') {
          data = JSON.parse(rawApiResponse.data);
        } else {
          data = rawApiResponse.data;
        }
        setSiteContent(data);
      } catch (error) {
        console.error('Error parsing site content data:', error);
      }
    }
  }, [content, rawApiResponse]);

  // Log loading and error states
  useEffect(() => {
    if (loading) {
      console.log('SiteContentContext: Loading site content data...');
    }
    
    if (error) {
      console.error('SiteContentContext: Error loading site content data:', error);
    }
  }, [loading, error]);

  // Provide a fallback value if siteContent is undefined
  const fallbackContent: UISiteContent = {
    navigationBar: {
      brand: {
        name: "Restaurant",
        logo: {
          icon: "Utensils",
          text: "Restaurant"
        }
      },
      navigation: {
        links: []
      },
      hero: {
        banners: [],
        autoPlayInterval: 5000
      },
      experience: {
        section: {
          title: "",
          subtitle: ""
        },
        cards: []
      }
    },
    footer: {
      newsletter: {
        title: "",
        description: ""
      },
      servicesSection: {
        title: "",
        links: []
      },
      copyright: {
        text: ""
      },
      social: {
        links: []
      }
    }
  };

  // Show loading indicator while content is being fetched
  if (loading && !siteContent) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-gray-700 font-medium">Your website is loading...</p>
        </div>
      </div>
    );
  }

  // Show error message if there was an error loading the content
  if (error && !siteContent) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center p-6 max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Content</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(fetchSiteContentRequest())}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Provide the context value with proper error handling
  return (
    <SiteContentContext.Provider value={siteContent || fallbackContent}>
      {children}
    </SiteContentContext.Provider>
  );
}

// Custom hook to use the site content context with proper typing
export function useSiteContent(): UISiteContent {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }

  return context;
}
