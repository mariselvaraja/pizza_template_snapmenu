import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  type: 'pizza' | 'sides' | 'drinks' | 'desserts';
  rating: number;
  spicyLevel?: number;
  isVegan?: boolean;
  isGlutenFree?: boolean;
};

const menuItems: MenuItem[] = [
  // Pizzas - Classic
  {
    id: "1",
    name: "Pepperoni Paradise",
    description: "Double layer of pepperoni with extra mozzarella cheese",
    price: "$16.99",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "classic",
    type: "pizza",
    rating: 5,
    spicyLevel: 1
  },
  {
    id: "2",
    name: "Meteor Margherita",
    description: "Fresh tomatoes, mozzarella, basil, and extra virgin olive oil",
    price: "$15.99",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "classic",
    type: "pizza",
    rating: 5,
    isVegan: true
  },
  {
    id: "3",
    name: "Hawaiian Horizon",
    description: "Ham, pineapple, and extra mozzarella on our signature sauce",
    price: "$17.99",
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "classic",
    type: "pizza",
    rating: 4
  },

  // Pizzas - Specialty
  {
    id: "4",
    name: "Cosmic Supreme",
    description: "Loaded with pepperoni, mushrooms, onions, green peppers, and black olives",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "specialty",
    type: "pizza",
    rating: 5,
    spicyLevel: 2
  },
  {
    id: "5",
    name: "BBQ Chicken Blast",
    description: "Grilled chicken, BBQ sauce, red onions, and cilantro",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "specialty",
    type: "pizza",
    rating: 4
  },
  {
    id: "6",
    name: "Mediterranean Moon",
    description: "Feta, olives, sun-dried tomatoes, and fresh herbs",
    price: "$19.99",
    image: "https://images.unsplash.com/photo-1571066811602-716837d681de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "specialty",
    type: "pizza",
    rating: 5
  },

  // Pizzas - Vegan
  {
    id: "7",
    name: "Veggie Voyager",
    description: "Mushrooms, bell peppers, onions, black olives, and fresh tomatoes",
    price: "$17.99",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "vegan",
    type: "pizza",
    rating: 4,
    isVegan: true
  },
  {
    id: "8",
    name: "Garden Galaxy",
    description: "Plant-based cheese, roasted vegetables, and fresh arugula",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1576458088443-04a19bb13da6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "vegan",
    type: "pizza",
    rating: 5,
    isVegan: true
  },

  // Sides
  {
    id: "9",
    name: "Cosmic Wings",
    description: "Choose from BBQ, Buffalo, or Garlic Parmesan",
    price: "$9.99",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "sides",
    type: "sides",
    rating: 5,
    spicyLevel: 2
  },
  {
    id: "10",
    name: "Garlic Knots",
    description: "Fresh-baked and brushed with garlic butter",
    price: "$6.99",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "sides",
    type: "sides",
    rating: 4
  },

  // Desserts
  {
    id: "11",
    name: "Chocolate Nebula",
    description: "Warm chocolate chip cookie topped with ice cream",
    price: "$7.99",
    image: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "desserts",
    type: "desserts",
    rating: 5
  },
  {
    id: "12",
    name: "Stellar Cinnamon Sticks",
    description: "With sweet icing dip",
    price: "$5.99",
    image: "https://images.unsplash.com/photo-1583095117886-c12c78862086?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "desserts",
    type: "desserts",
    rating: 4
  },

  // Drinks
  {
    id: "13",
    name: "Cosmic Cola",
    description: "Classic cola with a space twist",
    price: "$2.99",
    image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "drinks",
    type: "drinks",
    rating: 4
  },
  {
    id: "14",
    name: "Milky Way Shake",
    description: "Rich and creamy vanilla milkshake",
    price: "$4.99",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "drinks",
    type: "drinks",
    rating: 5
  }
];

const categories = [
  { id: 'all', name: 'All Items', type: 'all' },
  { id: 'pizza', name: 'Pizzas', type: 'pizza' },
  { id: 'sides', name: 'Sides', type: 'sides' },
  { id: 'desserts', name: 'Desserts', type: 'desserts' },
  { id: 'drinks', name: 'Drinks', type: 'drinks' }
];

const subCategories = [
  { id: 'all', name: 'All' },
  { id: 'classic', name: 'Classic' },
  { id: 'specialty', name: 'Specialty' },
  { id: 'vegan', name: 'Vegan' }
];

export default function Menu() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredItems = menuItems.filter(item => {
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    if (selectedType === 'pizza' && selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-asc') return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
    if (sortBy === 'price-desc') return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
    return 0;
  });

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600">
            Explore our selection of out-of-this-world dishes
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col space-y-4 mb-12">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedType(category.id);
                  setSelectedCategory('all');
                }}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedType === category.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {selectedType === 'pizza' && (
            <div className="flex flex-wrap gap-4">
              {subCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.spicyLevel && (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      {"🌶️".repeat(item.spicyLevel)}
                    </div>
                  )}
                  {item.isVegan && (
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Vegan
                    </div>
                  )}
                  {item.isGlutenFree && (
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      GF
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <span className="text-lg font-bold text-red-500">{item.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Link
                    to="/order"
                    className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}