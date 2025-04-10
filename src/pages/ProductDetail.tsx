import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useMenu, MenuItem } from '../context/MenuContext';
import { useAppDispatch, addItem, CartItem } from '../shared/redux';

export default function ProductDetail() {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const { menuData } = useMenu();
    const dispatch = useAppDispatch();

    // Function to generate a numeric hash from a string (same as in Menu.tsx)
    const hashStringToNumber = (str: string): number => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    };

    // Find the product in the menu data
    const findProduct = (): MenuItem | undefined => {
        for (const category in menuData.menu) {
            const product = menuData.menu[category].find(item => item.id === productId);
            if (product) return product;
        }
        return undefined;
    };

    const product = findProduct();

    const handleAddToCart = (menuItem: MenuItem) => {
        const cartItem: CartItem = {
            id: hashStringToNumber(menuItem.id),
            name: menuItem.name,
            price: parseFloat(menuItem.price),
            image: menuItem.image,
            quantity: 1,
        };
        dispatch(addItem(cartItem));
    };

    if (!product) {
        return (
            <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
                <button 
                    onClick={() => navigate('/menu')}
                    className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Menu
                </button>
            </div>
        );
    }

    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button 
                    onClick={() => navigate('/menu')}
                    className="inline-flex items-center mb-8 bg-gray-100 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Menu
                </button>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Related Products on LHS */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-1"
                    >
                        <h2 className="text-xl font-semibold mb-4">Other Products</h2>
                        <div className="space-y-4">
                            {Object.values(menuData.menu)
                                .flat()
                                .filter(item => item.id !== product.id)
                                .slice(0, 5)
                                .map(item => (
                                    <div 
                                        key={item.id} 
                                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => navigate(`/product/${item.id}`)}
                                    >
                                        <div className="flex items-center p-2">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-16 h-16 object-cover rounded-md mr-3"
                                            />
                                            <div>
                                                <h3 className="font-medium text-sm">{item.name}</h3>
                                                <p className="text-red-500 text-xs">${item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </motion.div>

                    {/* Product Details on RHS */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-3"
                    >
                        {/* Product Header with Image on Right */}
                        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                            <div className="md:pr-8 md:w-1/2">
                                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                                <div className="text-2xl font-bold text-red-500 mb-4">${product.price}</div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {product.dietary?.isVegetarian && (
                                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                            Vegetarian
                                        </div>
                                    )}
                                    {product.dietary?.isVegan && (
                                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                            Vegan
                                        </div>
                                    )}
                                    {product.dietary?.isGlutenFree && (
                                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                            GF
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-700">{product.description}</p>
                            </div>
                            <div className="md:w-1/2 mt-4 md:mt-0">
                                <div className="relative rounded-lg overflow-hidden shadow-lg">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Nutritional Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded">
                                    <span className="font-medium">Calories:</span> {product.calories}
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <span className="font-medium">Protein:</span> {product.nutrients.protein}
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <span className="font-medium">Carbs:</span> {product.nutrients.carbs}
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <span className="font-medium">Fat:</span> {product.nutrients.fat}
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Allergens</h2>
                            <div className="flex flex-wrap gap-2">
                                {product.allergens.map((allergen, index) => (
                                    <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                        {allergen}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                            <p className="text-gray-700">{product.ingredients.join(', ')}</p>
                        </div>

                        <button
                            className="w-full inline-flex items-center justify-center bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors"
                            onClick={() => handleAddToCart(product)}
                        >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                        </button>

                        {product.pairings.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-2">Pairs Well With</h2>
                                <div className="text-gray-700">{product.pairings.join(', ')}</div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
