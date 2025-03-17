import { motion } from 'framer-motion';
import { useState } from 'react';
import { Pizza, Clock, Truck } from 'lucide-react';

export default function Order() {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Order Online</h1>
          <p className="text-xl text-gray-600">
            Fresh, hot pizza delivered to your door or ready for pickup
          </p>
        </motion.div>

        {/* Order Type Selection */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex rounded-lg overflow-hidden">
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex-1 py-4 px-6 flex items-center justify-center space-x-2 ${
                orderType === 'delivery' ? 'bg-red-500 text-white' : 'bg-gray-100'
              }`}
            >
              <Truck className="h-5 w-5" />
              <span>Delivery</span>
            </button>
            <button
              onClick={() => setOrderType('pickup')}
              className={`flex-1 py-4 px-6 flex items-center justify-center space-x-2 ${
                orderType === 'pickup' ? 'bg-red-500 text-white' : 'bg-gray-100'
              }`}
            >
              <Clock className="h-5 w-5" />
              <span>Pickup</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Menu</h2>
            <div className="space-y-6">
              {[
                {
                  name: "Cosmic Supreme",
                  description: "Pepperoni, mushrooms, onions, green peppers, black olives",
                  price: "$18.99",
                  image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Meteor Margherita",
                  description: "Fresh tomatoes, mozzarella, basil",
                  price: "$15.99",
                  image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Galaxy Special",
                  description: "Ham, pineapple, bacon, extra cheese",
                  price: "$20.99",
                  image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-1/3 object-cover"
                  />
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <p className="text-lg font-bold text-red-500">{item.price}</p>
                    </div>
                    <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <p className="text-gray-600">Your cart is empty</p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
              </div>
              <button
                className="w-full bg-red-500 text-white py-3 rounded-full mt-6 font-semibold hover:bg-red-600 transition-colors"
                disabled
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}