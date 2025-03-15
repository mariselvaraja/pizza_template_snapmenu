import { createContext, useContext, ReactNode } from 'react';
import siteContentData from '../data/siteContent.json';

// Define types for site content structure
export interface SiteContent {
  brand: {
    name: string;
    logo: {
      icon: string;
      text: string;
    };
  };
  navigation: {
    links: {
      label: string;
      path: string;
      isEnabled: boolean;
    }[];
  };
  hero: any;
  experience: any;
  story: {
    hero: {
      image: string;
      title: string;
      description: string;
    };
    values: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  blog: {
    header: {
      title: string;
      description: string;
    };
    posts: {
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
    }[];
  };
  reservation: {
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
  footer: any;
  gallery: {
    section: {
      title: string;
      subtitle: string;
    };
    images: {
      image: string;
      title: string;
      description: string;
    }[];
  };
  events: {
    section: {
      title: string;
      subtitle: string;
    };
    items: {
      image: string;
      title: string;
      description: string;
      date: string;
      time: string;
      location: string;
    }[];
  };
  contact: {
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
}


// Create the context with default undefined value
export const SiteContentContext = createContext<SiteContent | undefined>(undefined);

// Props for the provider component
interface SiteContentProviderProps {
  children: ReactNode;
}

// Provider component that will wrap the app
export function SiteContentProvider({ children }: SiteContentProviderProps) {
  const contextValue: SiteContent = siteContentData;

  return (
    <SiteContentContext.Provider value={contextValue}>
      {children}
    </SiteContentContext.Provider>
  );
}

// Custom hook to use the site content context
export function useSiteContent() {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }

  return context;
}
