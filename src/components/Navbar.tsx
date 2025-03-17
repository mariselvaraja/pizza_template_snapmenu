import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Pizza } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Pizza className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">Pizza Planet</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
              <Link to="/menu" className="hover:text-red-500 transition-colors">Menu</Link>
              <Link to="/events" className="hover:text-red-500 transition-colors">Events</Link>
              <Link to="/gallery" className="hover:text-red-500 transition-colors">Gallery</Link>
              <Link to="/blog" className="hover:text-red-500 transition-colors">Blog</Link>
              <Link to="/locations" className="hover:text-red-500 transition-colors">Locations</Link>
              <Link to="/about" className="hover:text-red-500 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-red-500 transition-colors">Contact</Link>
              <Link 
                to="/reservation" 
                className="bg-white text-red-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Book a Table
              </Link>
              <Link 
                to="/order" 
                className="bg-red-500 px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors"
              >
                Order Now
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-red-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 hover:text-red-500">Home</Link>
            <Link to="/menu" className="block px-3 py-2 hover:text-red-500">Menu</Link>
            <Link to="/events" className="block px-3 py-2 hover:text-red-500">Events</Link>
            <Link to="/gallery" className="block px-3 py-2 hover:text-red-500">Gallery</Link>
            <Link to="/blog" className="block px-3 py-2 hover:text-red-500">Blog</Link>
            <Link to="/locations" className="block px-3 py-2 hover:text-red-500">Locations</Link>
            <Link to="/about" className="block px-3 py-2 hover:text-red-500">About</Link>
            <Link to="/contact" className="block px-3 py-2 hover:text-red-500">Contact</Link>
            <Link 
              to="/reservation" 
              className="block px-3 py-2 bg-white text-red-500 text-center rounded-full mt-4 hover:bg-gray-100"
            >
              Book a Table
            </Link>
            <Link 
              to="/order" 
              className="block px-3 py-2 bg-red-500 text-center rounded-full mt-4 hover:bg-red-600"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}