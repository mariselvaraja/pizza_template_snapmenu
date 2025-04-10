import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Clock, Award, Pizza, Play, UtensilsCrossed, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { SiteContentContext } from '../context/SiteContentContext';
import { useAppDispatch, useAppSelector, fetchMenuRequest } from '../shared/redux';

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  const siteContent = useContext(SiteContentContext);
  const dispatch = useAppDispatch();
  const { items: menuItems, loading: menuLoading } = useAppSelector(state => state.menu);
  const heroData = siteContent?.hero;
  const currentBanner = heroData?.banners[0]; // Assuming you want to use the first banner for now
  
  // Fetch menu data when component mounts
  useEffect(() => {
    dispatch(fetchMenuRequest());
  }, [dispatch]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {currentBanner && (
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('${currentBanner.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {currentBanner?.title || 'Default Title'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              {currentBanner?.subtitle || 'Default Subtitle'}
            </p>
            <div className="flex gap-4">
              <Link
                to="/order"
                className="inline-flex items-center bg-red-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Order Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center bg-white bg-opacity-20 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-30 transition-colors"
              >
                <Play className="mr-2 h-5 w-5" /> Watch Video
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Video Modal */}
      {videoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
            >
              <span className="text-2xl">&times;</span>
            </button>
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Pizza Planet Story"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Pizza,
                title: "Fresh Ingredients",
                description: "We use only the freshest ingredients, sourced daily from local suppliers."
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Hot and fresh pizza delivered to your door in 30 minutes or less."
              },
              {
                icon: Award,
                title: "Award Winning",
                description: "Voted best pizza in the galaxy for 5 years running."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <feature.icon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with Image */}
          <div className="relative rounded-xl overflow-hidden mb-16 h-96">
            <div 
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url('${siteContent?.story?.hero?.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-5xl font-bold mb-6">{siteContent?.story?.hero?.title || "Our Story"}</h2>
                <p className="text-xl max-w-3xl mx-auto">
                  {siteContent?.story?.hero?.description || "Take a journey through our culinary process"}
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {siteContent?.story?.values?.map((value: any, index: number) => {
              // Determine which icon to use based on the icon name in the value
              let IconComponent = UtensilsCrossed;
              if (value.icon === "Heart") IconComponent = Heart;
              else if (value.icon === "Users") IconComponent = Users;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="text-center p-6 bg-gray-800 rounded-lg"
                >
                  <div className="bg-red-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Menu Items</h2>
            <p className="text-xl text-gray-600">Try our most popular creations</p>
          </motion.div>
          
          {menuLoading ? (
            <div className="text-center py-8">
              <p className="text-xl">Loading featured items...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(menuItems.length >= 3 ? 
                menuItems.filter(item => item.category === 'mains').slice(0, 3) : 
                [
                  {
                    id: 1,
                    name: "Wagyu Ribeye",
                    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80",
                    price: 120,
                    description: "A5 grade Japanese Wagyu ribeye with roasted bone marrow and red wine reduction",
                    category: "mains",
                    available: true
                  },
                  {
                    id: 2,
                    name: "Pan-Seared Sea Bass",
                    image: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?auto=format&fit=crop&q=80",
                    price: 42,
                    description: "Mediterranean sea bass with saffron risotto and lemon butter sauce",
                    category: "mains",
                    available: true
                  },
                  {
                    id: 3,
                    name: "Black Truffle Risotto",
                    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c1?auto=format&fit=crop&q=80",
                    price: 38,
                    description: "Creamy Arborio rice with black truffle, wild mushrooms, and aged Parmesan",
                    category: "mains",
                    available: true
                  }
                ]
              ).map((menuItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={menuItem.image}
                    alt={menuItem.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{menuItem.name}</h3>
                    <p className="text-gray-600 mb-4">{menuItem.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-500">${menuItem.price}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Delivery Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6">Fast & Free Delivery</h2>
              <p className="text-xl text-gray-600 mb-8">
                We deliver to all locations in our service area. Order now and get your pizza delivered hot and fresh to your doorstep.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-red-500 mr-4" />
                  <span>30 Minutes or Less</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-6 w-6 text-red-500 mr-4" />
                  <span>Free Delivery on Orders Over $20</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-96 rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                alt="Pizza delivery"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-500 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Order?</h2>
            <p className="text-xl mb-8">Get your favorite pizza delivered to your doorstep!</p>
            <Link
              to="/order"
              className="inline-flex items-center bg-white text-red-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Order Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
