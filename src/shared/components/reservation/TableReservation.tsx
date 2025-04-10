import { useState, useEffect } from 'react';
import { Phone, Mail, X, Calendar, Clock, Users, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';

interface TableReservationProps {
  onBookingComplete?: (bookingData: BookingData) => void;
  initialDate?: string;
  initialTime?: string;
  reservationContent: {
    form: {
      labels: {
        name: string;
        phone: string;
        email: string;
        specialRequests: string;
      };
      placeholders: {
        specialRequests: string;
      };
    };
  };
}

export interface BookingData {
  tableId: number;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
}

export default function TableReservation({ 
  onBookingComplete,
  initialDate,
  initialTime, 
  reservationContent 
}: TableReservationProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate || '22'); // Use initialDate if provided, otherwise default to the 22nd
  const [selectedTime, setSelectedTime] = useState(initialTime || '19:00'); // Use initialTime if provided, otherwise default to 7:00 PM
  const [selectedTable, setSelectedTable] = useState(6); // Default to table 6
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [activeFilter, setActiveFilter] = useState<number | null>(null); // Filter for table capacity (2, 4, 6, 8)
  const [showAvailable, setShowAvailable] = useState(true); // Show available tables
  const [showReserved, setShowReserved] = useState(true); // Show reserved tables
  const [drawerOpen, setDrawerOpen] = useState(false); // Control drawer visibility
  const [qrValue, setQrValue] = useState(''); // QR code value

  // Days of the week for the date selector
  const days = [
    { day: '19', weekday: 'Sun' },
    { day: '20', weekday: 'Mon' },
    { day: '21', weekday: 'Tue' },
    { day: '22', weekday: 'Wed' },
    { day: '23', weekday: 'Thu' },
    { day: '24', weekday: 'Fri' },
  ];

  // Time slots for the time selector
  const timeSlots = ['11:00', '13:00', '19:00', '21:00'];

  // Define table status type
  type TableStatus = 'available' | 'booked' | 'selected';
  
  // Table status (available, booked, selected)
  const tableStatus: Record<number, TableStatus> = {
    1: 'available', // 2 seater
    2: 'available', // 2 seater
    3: 'available', // 4 seater
    4: 'booked',    // 4 seater
    5: 'available', // 6 seater
    6: 'selected',  // 6 seater
    7: 'booked',    // 8 seater
    8: 'available', // 8 seater
  };

  const handleTableSelect = (tableId: number): void => {
    if (tableStatus[tableId] !== 'booked') {
      setSelectedTable(tableId);
      setDrawerOpen(true);
      
      // Generate QR code value with table info
      const qrData = {
        tableId,
        date: selectedDate,
        time: selectedTime,
        capacity: tableId <= 2 ? 2 : tableId <= 4 ? 4 : tableId <= 6 ? 6 : 8
      };
      setQrValue(JSON.stringify(qrData));
    }
  };
  
  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const drawer = document.getElementById('booking-drawer');
      if (drawer && !drawer.contains(e.target as Node) && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerOpen]);

  const handleBooking = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    const bookingData: BookingData = {
      tableId: selectedTable,
      date: selectedDate,
      time: selectedTime,
      name,
      phone,
      email,
      specialRequests
    };
    
    if (onBookingComplete) {
      onBookingComplete(bookingData);
    } else {
      // Default behavior if no callback is provided
      alert(`Table ${selectedTable} booked for ${selectedDate} at ${selectedTime}`);
    }
  };

  return (
    <div className="w-full">
      {/* Table Selection Layout */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 mx-auto max-w-full"
      >
        {/* Date, Time Selection and Filters */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-4">
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input 
              type="time" 
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col space-y-3">
            {/* Table Capacity Filters */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500 mr-2">Filter by seats:</span>
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === null 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              {[2, 4, 6, 8].map(capacity => (
                <button
                  key={capacity}
                  onClick={() => setActiveFilter(activeFilter === capacity ? null : capacity)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === capacity 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {capacity} Seater
                </button>
              ))}
            </div>
            
            {/* Table Status Filters */}
            <div className="flex items-center space-x-6">
              <span className="text-sm font-medium text-gray-500 mr-2">Show:</span>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showAvailable} 
                  onChange={() => setShowAvailable(!showAvailable)}
                  className="form-checkbox h-4 w-4 text-red-500 rounded focus:ring-red-500"
                />
                <span className="text-sm">Available</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showReserved} 
                  onChange={() => setShowReserved(!showReserved)}
                  className="form-checkbox h-4 w-4 text-red-500 rounded focus:ring-red-500"
                />
                <span className="text-sm">Reserved</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Table Layout */}
        <div className="relative rounded-lg p-8 mb-8 bg-gray-50 shadow-inner border border-gray-100">
          
          {/* 2 Seater Tables */}
          <div className="mb-12" style={{ 
            display: (activeFilter !== null && activeFilter !== 2) ? 'none' : 'block' 
          }}>
            <h4 className="text-md font-medium mb-6 border-b pb-2">2 Seater Tables</h4>
            <div className="flex justify-center space-x-16">
              {/* Table 1 - 2 seater rectangular */}
              <div 
                className={`relative w-24 h-16 rounded-lg ${
                  selectedTable === 1 
                    ? 'border-2 border-black bg-red-100 shadow-md' 
                    : tableStatus[1] === 'booked' 
                      ? 'bg-blue-100 shadow-sm' 
                      : 'bg-gray-200 shadow-sm hover:shadow-md'
                } flex justify-center items-center cursor-pointer transition-all duration-200`}
                onClick={() => handleTableSelect(1)}
                style={{ display: tableStatus[1] === 'booked' ? (showReserved ? 'flex' : 'none') : (showAvailable ? 'flex' : 'none') }}
              >
                {/* Chairs left and right */}
                <div className="absolute top-0 -left-4 bottom-0 flex flex-col justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400 shadow-sm"></div>
                </div>
                <div className="absolute top-0 -right-4 bottom-0 flex flex-col justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-xs font-medium">Table 1</span>
                {tableStatus[1] === 'booked' && (
                  <span className="absolute -bottom-6 text-xs font-medium text-blue-600 bg-white px-2 py-0.5 rounded-full shadow-sm">Reserved</span>
                )}
              </div>

              {/* Table 2 - 2 seater rectangular */}
              <div 
                className={`relative w-24 h-16 rounded-lg ${
                  selectedTable === 2 
                    ? 'border-2 border-black bg-red-100 shadow-md' 
                    : tableStatus[2] === 'booked' 
                      ? 'bg-blue-100 shadow-sm' 
                      : 'bg-gray-200 shadow-sm hover:shadow-md'
                } flex justify-center items-center cursor-pointer transition-all duration-200`}
                onClick={() => handleTableSelect(2)}
                style={{ display: tableStatus[2] === 'booked' ? (showReserved ? 'flex' : 'none') : (showAvailable ? 'flex' : 'none') }}
              >
                {/* Chairs left and right */}
                <div className="absolute top-0 -left-4 bottom-0 flex flex-col justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <div className="absolute top-0 -right-4 bottom-0 flex flex-col justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-xs">Table 2</span>
                {tableStatus[2] === 'booked' && (
                  <span className="absolute -bottom-6 text-xs font-medium text-blue-600">Reserved</span>
                )}
              </div>
            </div>
          </div>

          {/* 4 Seater Tables */}
          <div className="mb-12" style={{ display: activeFilter !== null && activeFilter !== 4 ? 'none' : 'block' }}>
            <h4 className="text-md font-medium mb-6 border-b pb-2">4 Seater Tables</h4>
            <div className="flex justify-center space-x-16">
              {/* Table 3 - 4 seater rectangular */}
              <div 
                className={`relative w-36 h-24 rounded-lg ${
                  selectedTable === 3 
                    ? 'border-2 border-black bg-red-100 shadow-md' 
                    : tableStatus[3] === 'booked' 
                      ? 'bg-blue-100 shadow-sm' 
                      : 'bg-gray-200 shadow-sm hover:shadow-md'
                } flex justify-center items-center cursor-pointer transition-all duration-200`}
                onClick={() => handleTableSelect(3)}
                style={{ display: tableStatus[3] === 'booked' ? (showReserved ? 'flex' : 'none') : (showAvailable ? 'flex' : 'none') }}
              >
                {/* Chairs top */}
                <div className="absolute -top-4 left-0 right-0 flex justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                {/* Chairs bottom */}
                <div className="absolute -bottom-4 left-0 right-0 flex justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-xs">Table 3</span>
                {tableStatus[3] === 'booked' && (
                  <span className="absolute -bottom-8 text-xs font-medium text-blue-600 bg-white px-2 py-0.5 rounded-full shadow-sm">Reserved</span>
                )}
              </div>

              {/* Table 4 - 4 seater rectangular */}
              <div 
                className={`relative w-36 h-24 rounded-lg ${
                  selectedTable === 4 
                    ? 'border-2 border-black bg-red-100 shadow-md' 
                    : tableStatus[4] === 'booked' 
                      ? 'bg-blue-100 shadow-sm' 
                      : 'bg-gray-200 shadow-sm hover:shadow-md'
                } flex justify-center items-center cursor-pointer transition-all duration-200`}
                onClick={() => handleTableSelect(4)}
                style={{ display: tableStatus[4] === 'booked' ? (showReserved ? 'flex' : 'none') : (showAvailable ? 'flex' : 'none') }}
              >
                {/* Chairs top */}
                <div className="absolute -top-4 left-0 right-0 flex justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                {/* Chairs bottom */}
                <div className="absolute -bottom-4 left-0 right-0 flex justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-xs">Table 4</span>
                {tableStatus[4] === 'booked' && (
                  <span className="absolute -bottom-8 text-xs font-medium text-blue-600">Reserved</span>
                )}
              </div>
            </div>
          </div>

          {/* 6 Seater Tables */}
          <div className="mb-12" style={{ display: activeFilter !== null && activeFilter !== 6 ? 'none' : 'block' }}>
            <h4 className="text-md font-medium mb-6 border-b pb-2">6 Seater Tables</h4>
            <div className="flex justify-center space-x-16">
              {/* Table 5 - 6 seater rectangular */}
              <div 
                className={`relative w-48 h-24 rounded-lg ${
                  selectedTable === 5 
                    ? 'border-2 border-black bg-red-100 shadow-md' 
                    : tableStatus[5] === 'booked' 
                      ? 'bg-blue-100 shadow-sm' 
                      : 'bg-gray-200 shadow-sm hover:shadow-md'
                } flex justify-center items-center cursor-pointer transition-all duration-200`}
                onClick={() => handleTableSelect(5)}
                style={{ display: tableStatus[5] === 'booked' ? (showReserved ? 'flex' : 'none') : (showAvailable ? 'flex' : 'none') }}
              >
                {/* Chairs top */}
                <div className="absolute -top-4 left-0 right-0 flex justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                {/* Chairs bottom */}
                <div className="absolute -bottom-4 left-0 right-0 flex justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-xs">Table 5</span>
                {tableStatus[5] === 'booked' && (
                  <span className="absolute -bottom-8 text-xs font-medium text-blue-600">Reserved</span>
                )}
              </div>

              {/* Table 6 - 6 seater round */}
              <div 
                className={`relative w-32 h-32 rounded-full ${
                  selectedTable === 6 
                    ? 'border-2 border-black bg-red-100 shadow-md' 
                    : tableStatus[6] === 'booked' 
                      ? 'bg-blue-100 shadow-sm' 
                      : 'bg-gray-200 shadow-sm hover:shadow-md'
                } flex justify-center items-center cursor-pointer transition-all duration-200`}
                onClick={() => handleTableSelect(6)}
                style={{ display: tableStatus[6] === 'booked' ? (showReserved ? 'flex' : 'none') : (showAvailable ? 'flex' : 'none') }}
              >
                {/* Chairs around */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <div className="absolute top-1/4 right-1/4">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <div className="absolute bottom-1/4 left-1/4">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-xs">Table 6</span>
                {tableStatus[6] === 'booked' && (
                  <span className="absolute -bottom-8 text-xs font-medium text-blue-600">Reserved</span>
                )}
              </div>
            </div>
          </div>

          {/* 8 Seater Tables */}
          <div className="mb-12" style={{ display: activeFilter !== null && activeFilter !== 8 ? 'none' : 'block' }}>
            <h4 className="text-md font-medium mb-6 border-b pb-2">8 Seater Tables</h4>
            <div className="flex justify-center space-x-16">
              {/* Table 7 - 8 seater rectangular */}
              <div 
                className={`relative w-64 h-24 rounded-lg ${
                  selectedTable === 7 
                    ? 'border-2 border-black bg-red-100 shadow-md' 
                    : tableStatus[7] === 'booked' 
                      ? 'bg-blue-100 shadow-sm' 
                      : 'bg-gray-200 shadow-sm hover:shadow-md'
                } flex justify-center items-center cursor-pointer transition-all duration-200`}
                onClick={() => handleTableSelect(7)}
                style={{ display: tableStatus[7] === 'booked' ? (showReserved ? 'flex' : 'none') : (showAvailable ? 'flex' : 'none') }}
              >
                {/* Chairs top */}
                <div className="absolute -top-4 left-0 right-0 flex justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                {/* Chairs bottom */}
                <div className="absolute -bottom-4 left-0 right-0 flex justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-xs">Table 7</span>
                {tableStatus[7] === 'booked' && (
                  <span className="absolute -bottom-8 text-xs font-medium text-blue-600">Reserved</span>
                )}
              </div>

              {/* Table 8 - 8 seater rectangular */}
              <div 
                className={`relative w-64 h-24 rounded-lg ${
                  selectedTable === 8 
                    ? 'border-2 border-black bg-red-100 shadow-md' 
                    : tableStatus[8] === 'booked' 
                      ? 'bg-blue-100 shadow-sm' 
                      : 'bg-gray-200 shadow-sm hover:shadow-md'
                } flex justify-center items-center cursor-pointer transition-all duration-200`}
                onClick={() => handleTableSelect(8)}
                style={{ display: tableStatus[8] === 'booked' ? (showReserved ? 'flex' : 'none') : (showAvailable ? 'flex' : 'none') }}
              >
                {/* Chairs top */}
                <div className="absolute -top-4 left-0 right-0 flex justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                {/* Chairs bottom */}
                <div className="absolute -bottom-4 left-0 right-0 flex justify-around">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-xs">Table 8</span>
                {tableStatus[8] === 'booked' && (
                  <span className="absolute -bottom-8 text-xs font-medium text-blue-600">Reserved</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Table Legend */}
        <div className="flex justify-center space-x-10 mb-8 mt-8 bg-white p-4 rounded-lg shadow-sm max-w-md mx-auto">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 mr-2 shadow-sm"></div>
            <span className="text-xs font-medium">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 mr-2 shadow-sm"></div>
            <span className="text-xs font-medium">Reserved</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 mr-2 shadow-sm"></div>
            <span className="text-xs font-medium">Selected</span>
          </div>
        </div>
        
        {/* Booking Drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              id="booking-drawer"
              className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-lg z-50 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              {/* Drawer Header */}
              <div className="bg-red-500 text-white p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">Table {selectedTable} Reservation</h2>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Table Details with QR Code */}
              <div className="p-6 border-b">
                <div className="flex flex-wrap">
                  {/* Table Details */}
                  <div className="w-full md:w-1/2 pr-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Table Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Info className="text-red-500 mr-3" size={20} />
                        <span className="font-medium">Table Type:</span>
                        <span className="ml-2">{selectedTable === 6 ? "Round" : "Rectangular"}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="text-red-500 mr-3" size={20} />
                        <span className="font-medium">Capacity:</span>
                        <span className="ml-2">
                          {selectedTable <= 2 
                            ? "2 people" 
                            : selectedTable <= 4 
                              ? "4 people" 
                              : selectedTable <= 6 
                                ? "6 people" 
                                : "8 people"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="text-red-500 mr-3" size={20} />
                        <span className="font-medium">Date:</span>
                        <span className="ml-2">{selectedDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-red-500 mr-3" size={20} />
                        <span className="font-medium">Time:</span>
                        <span className="ml-2">{selectedTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* QR Code */}
                  <div className="w-full md:w-1/2 mt-6 md:mt-0 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Scan to Share</h3>
                    <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <QRCode 
                        value={qrValue} 
                        size={150} 
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="H"
                      />
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-2">
                      Scan this code to share reservation details
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Booking Form */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Reservation Details</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                    <textarea 
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Any special requests or dietary requirements"
                      rows={3}
                    />
                  </div>
                  
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const bookingData: BookingData = {
                        tableId: selectedTable,
                        date: selectedDate,
                        time: selectedTime,
                        name,
                        phone,
                        email,
                        specialRequests
                      };
                      
                      if (onBookingComplete) {
                        onBookingComplete(bookingData);
                      }
                      setDrawerOpen(false);
                    }}
                    className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600 transition-colors shadow-sm hover:shadow-md mt-6"
                  >
                    Confirm Reservation
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
