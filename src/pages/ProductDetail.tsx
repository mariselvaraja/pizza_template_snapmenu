import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector, addItem, CartItem, fetchMenuRequest, MenuItem } from '../shared/redux';
import { useEffect } from 'react';

export default function ProductDetail() {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    // Get menu data from Redux store
    const { items, loading, error } = useAppSelector(state => state.menu);
    
    // Fetch menu data when component mounts
    useEffect(() => {
        dispatch(fetchMenuRequest());
    }, [dispatch]);
    
    // Find the product in the menu data
    const product = items.find(item => item.id.toString() === productId);

    const handleAddToCart = (menuItem: MenuItem) => {
        const cartItem: CartItem = {
            id: menuItem.id, // ID is already a number
            name: menuItem.name,
            price: menuItem.price, // Price is already a number
            image: menuItem.image,
            quantity: 1,
        };
        dispatch(addItem(cartItem));
    };

    // Handle loading state
    if (loading) {
        return (
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back button skeleton */}
                    <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse mb-8"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Related Products skeleton on LHS */}
                        <div className="md:col-span-1">
                            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                                        <div className="flex items-center p-2">
                                            <div className="w-16 h-16 bg-gray-300 rounded-md mr-3 animate-pulse"></div>
                                            <div>
                                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                                                <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details skeleton on RHS */}
                        <div className="md:col-span-3">
                            {/* Product Header with Image on Right */}
                            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                                <div className="md:pr-8 md:w-1/2">
                                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="md:w-1/2 mt-4 md:mt-0">
                                    <div className="w-full h-64 bg-gray-300 rounded-lg animate-pulse"></div>
                                </div>
                            </div>

                            {/* Add to cart button skeleton */}
                            <div className="w-full h-12 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    // Handle error state
    if (error) {
        return (
            <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Error Loading Product</h1>
                <p className="text-xl text-red-500">{error}</p>
                <button 
                    onClick={() => dispatch(fetchMenuRequest())}
                    className="mt-4 inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Try Again
                </button>
            </div>
        );
    }
    
    // Handle product not found
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
                            {items
                                .filter(item => item.id.toString() !== productId)
                                .slice(0, 5)
                                .map(item => (
                                    <div 
                                        key={item.id} 
                                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => navigate(`/product/${item.id}`)}
                                    >
                                        <div className="flex items-center p-2">
                                            {item.image ? (
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-16 h-16 object-cover rounded-md mr-3"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md mr-3">
                                                    <span className="text-xl font-bold text-gray-500">
                                                        {item.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
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
                                    {product.tags && product.tags.includes('vegetarian') && (
                                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                            Vegetarian
                                        </div>
                                    )}
                                    {product.tags && product.tags.includes('vegan') && (
                                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                            Vegan
                                        </div>
                                    )}
                                    {product.tags && product.tags.includes('gluten-free') && (
                                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                            GF
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-700">{product.description}</p>
                            </div>
                            <div className="md:w-1/2 mt-4 md:mt-0">
                                <div className="relative rounded-lg overflow-hidden shadow-lg">
                                    {product.image ? (
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="w-full h-64 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                            <span className="text-6xl font-bold text-gray-500">
                                                {product.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Nutritional information section - removed as it's not in the Redux MenuItem type */}

                        <button
                            className="w-full inline-flex items-center justify-center bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors"
                            onClick={() => handleAddToCart(product)}
                        >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                        </button>

                        {/* Pairings section - removed as it's not in the Redux MenuItem type */}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
