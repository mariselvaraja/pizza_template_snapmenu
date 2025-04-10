import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { siteContentService } from '../shared/services';
import { useAppDispatch, useAppSelector } from '../shared/redux';
import { fetchSiteContentRequest } from '../shared/redux/slices/siteContentSlice';

// Define types for site content structure
export interface SiteContent {
  navigationBar: {
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
  };
  story?: {
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
  blog?: {
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
  footer?: any;
  gallery?: {
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
  events?: {
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
}


// Create the context with default undefined value
export const SiteContentContext = createContext<SiteContent | undefined>(undefined);

// Props for the provider component
interface SiteContentProviderProps {
  children: ReactNode;
}

// Provider component that will wrap the app
export function SiteContentProvider({ children }: SiteContentProviderProps) {
  const dispatch = useAppDispatch();
  const { content, loading, error } = useAppSelector(state => state.siteContent);
  const [siteContent, setSiteContent] = useState<SiteContent | undefined>(undefined);

  // Fetch site content data when the component mounts
  useEffect(() => {
    dispatch(fetchSiteContentRequest());
  }, [dispatch]);

  // Update the local state when the Redux store is updated
  useEffect(() => {
    if (content) {
      // Transform the Redux store data to match the SiteContent interface
      const transformedData: SiteContent = {
        navigationBar: {
          brand: {
            name: content.about?.team?.[0]?.name || 'Chris',
            logo: {
              icon: 'Utensils',
              text: content.about?.team?.[0]?.name || 'Chris'
            }
          },
          navigation: {
            links: [
              {
                label: 'Menu',
                path: '/menu',
                isEnabled: true
              },
              {
                label: 'Our Story',
                path: '/about',
                isEnabled: true
              },
              {
                label: 'Blog',
                path: '/blog',
                isEnabled: true
              },
              {
                label: 'Gallery',
                path: '/gallery',
                isEnabled: content.gallery && content.gallery.length > 0
              },
              {
                label: 'Events',
                path: '/events',
                isEnabled: content.events && content.events.length > 0
              },
              {
                label: 'Reserve Table',
                path: '/reservation',
                isEnabled: !!content.reservation
              },
              {
                label: 'Contact',
                path: '/contact',
                isEnabled: !!content.contact
              }
            ]
          },
          hero: {
            banners: [
              {
                image: content.about?.team?.[0]?.image || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
                title: content.about?.story || 'Escape the hustle and bustle of our charming cafe.',
                subtitle: 'Experience the art of fine dining in the heart of the city'
              }
            ],
            autoPlayInterval: 6000
          },
          experience: {
            section: {
              title: 'The Art of Fine Dining',
              subtitle: 'Discover the pillars of our gastronomic excellence'
            },
            cards: [
              {
                icon: 'Wine',
                title: 'Culinary Excellence',
                description: 'Experience culinary excellence with our carefully curated menu and premium ingredients.',
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80'
              },
              {
                icon: 'UtensilsCrossed',
                title: 'Michelin-Inspired Artistry',
                description: 'Our master chefs bring decades of experience in crafting exceptional dishes.',
                image: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?auto=format&fit=crop&q=80'
              },
              {
                icon: 'Clock',
                title: 'Orchestrated Perfection',
                description: 'Every dish is prepared and served at the perfect moment for optimal taste.',
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80'
              }
            ]
          }
        },
        story: {
          hero: {
            image: content.about?.team?.[0]?.image || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
            title: 'Our Story',
            description: content.about?.story || 'Discover the passion and tradition behind our culinary journey.'
          },
          values: content.about?.team?.map(member => ({
            icon: member.role || 'UtensilsCrossed',
            title: member.name,
            description: member.bio
          })) || []
        },
        blog: {
          header: {
            title: 'Our Blog',
            description: 'Culinary insights, recipes, and stories from our kitchen'
          },
          posts: content.blog?.map(post => ({
            id: post.id.toString(),
            title: post.title,
            subtitle: post.excerpt,
            content: post.content,
            image: post.image,
            videoThumbnail: '',
            videoUrl: '',
            chef: post.author,
            date: post.date,
            readTime: '5 min'
          })) || []
        },
        reservation: content.reservation ? {
          header: {
            title: content.reservation.title,
            description: content.reservation.description
          },
          info: {
            hours: {
              weekdays: {
                label: 'Monday - Thursday',
                time: '5:00 PM - 10:00 PM'
              },
              weekends: {
                label: 'Friday - Saturday',
                time: '5:00 PM - 11:00 PM'
              },
              sunday: {
                label: 'Sunday',
                time: '5:00 PM - 9:00 PM'
              }
            },
            location: {
              street: content.contact?.address.split(',')[0] || '123 Main Street',
              area: 'Downtown',
              city: content.contact?.address.split(',')[1]?.trim() || 'New York',
              state: content.contact?.address.split(',')[2]?.trim() || 'NY',
              zip: '10001'
            },
            contact: {
              phone: content.contact?.phone || '(212) 555-1234'
            },
            note: 'Reservations recommended. Please call us for parties of 6 or more.'
          },
          form: {
            labels: {
              date: 'Date',
              time: 'Time',
              guests: 'Number of Guests',
              name: 'Name',
              email: 'Email',
              phone: 'Phone',
              specialRequests: 'Special Requests'
            },
            placeholders: {
              name: 'Your full name',
              email: 'your@email.com',
              phone: '(123) 456-7890',
              specialRequests: 'Any special requests or dietary restrictions?'
            }
          }
        } : undefined,
        gallery: {
          section: {
            title: 'Our Gallery',
            subtitle: 'Explore our restaurant and cuisine through our gallery'
          },
          images: content.gallery?.map(item => ({
            image: item.image,
            title: item.title,
            description: item.description
          })) || []
        },
        events: {
          section: {
            title: 'Upcoming Events',
            subtitle: 'Join us for special culinary experiences and celebrations'
          },
          items: content.events?.map(event => ({
            image: event.image,
            title: event.title,
            description: event.description,
            date: event.date,
            time: '7:00 PM - 10:00 PM',
            location: 'Main Dining Room'
          })) || []
        },
        contact: content.contact ? {
          header: {
            title: 'Contact Us',
            subtitle: 'We\'d love to hear from you'
          },
          infoCards: {
            phone: {
              title: 'Phone',
              numbers: [content.contact.phone],
              hours: 'Available 7 days a week, 9am-10pm'
            },
            email: {
              title: 'Email',
              addresses: [content.contact.email],
              support: 'We\'ll respond as soon as possible'
            },
            address: {
              title: 'Location',
              street: content.contact.address.split(',')[0] || '123 Main Street',
              city: content.contact.address.split(',')[1]?.trim() || 'New York',
              state: content.contact.address.split(',')[2]?.trim() || 'NY',
              zip: '10001',
              label: content.locations?.[0]?.name || 'Downtown'
            },
            hours: {
              title: 'Hours',
              weekday: content.contact.hours.split(';')[0]?.trim() || 'Mon-Thu: 5pm-10pm',
              weekend: content.contact.hours.split(';')[1]?.trim() || 'Fri-Sat: 5pm-11pm',
              note: 'Closed on major holidays'
            }
          },
          form: {
            title: 'Send Us a Message',
            description: 'Have a question or feedback? Fill out the form below and we\'ll get back to you.',
            labels: {
              firstName: 'First Name',
              lastName: 'Last Name',
              email: 'Email',
              phone: 'Phone',
              subject: 'Subject',
              message: 'Message',
              submitButton: 'Send Message'
            },
            placeholders: {
              firstName: 'Your first name',
              lastName: 'Your last name',
              email: 'your@email.com',
              phone: '(123) 456-7890',
              subject: 'What is this regarding?',
              message: 'Your message here...'
            }
          },
          callToAction: {
            call: {
              title: 'Call Us',
              phone: content.contact.phone
            },
            email: {
              title: 'Email Us',
              address: content.contact.email
            },
            visit: {
              title: 'Visit Us',
              address: content.contact.address
            }
          },
          location: {
            title: 'Find Us',
            description: 'Located in the heart of downtown',
            mapEnabled: true
          }
        } : undefined,
        footer: {
          newsletter: {
            title: 'Subscribe to our newsletter',
            description: 'Stay updated with our latest news and offers'
          },
          servicesSection: {
            title: 'Our Services',
            links: [
              { label: 'Dine In', url: '/menu' },
              { label: 'Takeout', url: '/order' },
              { label: 'Delivery', url: '/order' },
              { label: 'Catering', url: '/contact' },
              { label: 'Private Events', url: '/events' }
            ]
          },
          copyright: {
            text: `© ${new Date().getFullYear()} ${content.about?.team?.[0]?.name || 'Chris'} Restaurant. All rights reserved.`
          },
          social: {
            links: [
              { icon: 'Facebook', url: 'https://facebook.com' },
              { icon: 'Instagram', url: 'https://instagram.com' },
              { icon: 'Twitter', url: 'https://twitter.com' }
            ]
          }
        }
      };

      setSiteContent(transformedData);
    }
  }, [content]);

  // Provide a default value while loading
  const defaultSiteContent: SiteContent = {
    navigationBar: {
      brand: {
        name: 'Chris',
        logo: {
          icon: 'Utensils',
          text: 'Chris'
        }
      },
      navigation: {
        links: [
          {
            label: 'Menu',
            path: '/menu',
            isEnabled: true
          },
          {
            label: 'Our Story',
            path: '/about',
            isEnabled: true
          },
          {
            label: 'Blog',
            path: '/blog',
            isEnabled: true
          },
          {
            label: 'Gallery',
            path: '/gallery',
            isEnabled: false
          },
          {
            label: 'Events',
            path: '/events',
            isEnabled: true
          },
          {
            label: 'Reserve Table',
            path: '/reservation',
            isEnabled: true
          },
          {
            label: 'Contact',
            path: '/contact',
            isEnabled: true
          }
        ]
      },
      hero: {
        banners: [
          {
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
            title: 'Escape the hustle and bustle of our charming cafe.',
            subtitle: 'Experience the art of fine dining in the heart of the city'
          }
        ],
        autoPlayInterval: 6000
      },
      experience: {
        section: {
          title: 'The Art of Fine Dining',
          subtitle: 'Discover the pillars of our gastronomic excellence'
        },
        cards: [
          {
            icon: 'Wine',
            title: 'Culinary Excellence',
            description: 'Experience culinary excellence with our carefully curated menu and premium ingredients.',
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80'
          },
          {
            icon: 'UtensilsCrossed',
            title: 'Michelin-Inspired Artistry',
            description: 'Our master chefs bring decades of experience in crafting exceptional dishes.',
            image: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?auto=format&fit=crop&q=80'
          },
          {
            icon: 'Clock',
            title: 'Orchestrated Perfection',
            description: 'Every dish is prepared and served at the perfect moment for optimal taste.',
            image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80'
          }
        ]
      }
    }
  };

  return (
    <SiteContentContext.Provider value={siteContent || defaultSiteContent}>
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
