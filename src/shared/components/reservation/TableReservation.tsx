import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

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
    1: 'available',
    2: 'selected',
    3: 'available',
    4: 'available',
    5: 'available',
    6: 'available',
    7: 'booked',
    8: 'booked',
  };

  const handleTableSelect = (tableId: number): void => {
    if (tableStatus[tableId] !== 'booked') {
      setSelectedTable(tableId);
    }
  };

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
        {/* Date and Time Selection */}
        <div className="flex items-center space-x-4 mb-6">
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
        
        {/* Table Layout */}
        <div className="relative rounded-lg p-6 mb-8">
          {/* Row 1 */}
          <div className="flex justify-between mb-16">
            {/* Table 1 - Large rectangular table for 6 */}
            <div 
              className={`relative w-48 h-24 rounded-lg ${
                selectedTable === 1 
                  ? 'border-2 border-black' 
                  : tableStatus[1] === 'booked' 
                    ? 'bg-gray-300' 
                    : 'bg-gray-200'
              } flex justify-center items-center cursor-pointer`}
              onClick={() => handleTableSelect(1)}
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
              <span className="text-xs">Table 1</span>
            </div>

            {/* Table 4 - Medium rectangular table for 4 */}
            <div 
              className={`relative w-36 h-24 rounded-lg ${
                selectedTable === 4 
                  ? 'border-2 border-black' 
                  : tableStatus[4] === 'booked' 
                    ? 'bg-gray-300' 
                    : 'bg-gray-200'
              } flex justify-center items-center cursor-pointer`}
              onClick={() => handleTableSelect(4)}
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
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex justify-between mb-16">
            {/* Table 2 - Small rectangular table for 2 */}
            <div 
              className={`relative w-36 h-16 rounded-lg ${
                selectedTable === 2 
                  ? 'border-2 border-black' 
                  : tableStatus[2] === 'booked' 
                    ? 'bg-gray-300' 
                    : 'bg-gray-200'
              } flex justify-center items-center cursor-pointer`}
              onClick={() => handleTableSelect(2)}
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
              <span className="text-xs">Table 2</span>
            </div>

            {/* Table 5 - Small square table for 2 */}
            <div 
              className={`relative w-24 h-16 rounded-lg ${
                selectedTable === 5 
                  ? 'border-2 border-black' 
                  : tableStatus[5] === 'booked' 
                    ? 'bg-gray-300' 
                    : 'bg-gray-200'
              } flex justify-center items-center cursor-pointer`}
              onClick={() => handleTableSelect(5)}
            >
              {/* Chairs left and right */}
              <div className="absolute top-0 -left-4 bottom-0 flex flex-col justify-around">
                <div className="w-6 h-6 rounded-full bg-gray-400"></div>
              </div>
              <div className="absolute top-0 -right-4 bottom-0 flex flex-col justify-around">
                <div className="w-6 h-6 rounded-full bg-gray-400"></div>
              </div>
              <span className="text-xs">Table 5</span>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex justify-center mb-16">
            {/* Table 6 - Round table for 4 */}
            <div 
              className={`relative w-32 h-32 rounded-full ${
                selectedTable === 6 
                  ? 'border-2 border-black bg-red-100' 
                  : tableStatus[6] === 'booked' 
                    ? 'bg-gray-300' 
                    : 'bg-red-100'
              } flex justify-center items-center cursor-pointer`}
              onClick={() => handleTableSelect(6)}
            >
              {/* Chairs around */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 rounded-full bg-red-500"></div>
              </div>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-red-500"></div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 rounded-full bg-red-500"></div>
              </div>
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-red-500"></div>
              </div>
              <span className="text-xs">Table 6</span>
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex justify-between">
            {/* Table 3 - Large rectangular table for 8 */}
            <div 
              className={`relative w-48 h-24 rounded-lg ${
                selectedTable === 3 
                  ? 'border-2 border-black' 
                  : tableStatus[3] === 'booked' 
                    ? 'bg-gray-300' 
                    : 'bg-gray-200'
              } flex justify-center items-center cursor-pointer`}
              onClick={() => handleTableSelect(3)}
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
              <span className="text-xs">Table 3</span>
            </div>

            {/* Table 8 - Large rectangular table for 10 */}
            <div 
              className={`relative w-64 h-24 rounded-lg ${
                selectedTable === 8 
                  ? 'border-2 border-black' 
                  : tableStatus[8] === 'booked' 
                    ? 'bg-gray-300' 
                    : 'bg-gray-200'
              } flex justify-center items-center cursor-pointer`}
              onClick={() => handleTableSelect(8)}
            >
              {/* Chairs top */}
              <div className="absolute -top-4 left-0 right-0 flex justify-around">
                <div className="w-6 h-6 rounded-full bg-gray-400"></div>
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
                <div className="w-6 h-6 rounded-full bg-gray-400"></div>
              </div>
              <span className="text-xs">Table 8</span>
            </div>
          </div>

          {/* Way In indicator */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-4">
            <div className="w-16 h-8 border-t-0 border-l-2 border-r-2 border-b-2 border-gray-300 rounded-b-lg flex justify-center">
              <span className="text-xs text-gray-500">Way In</span>
            </div>
          </div>
        </div>

        {/* Table Legend */}
        <div className="flex justify-end space-x-6 mb-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 mr-2"></div>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 mr-2"></div>
            <span className="text-xs">Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 mr-2"></div>
            <span className="text-xs">Selected</span>
          </div>
        </div>
        
        {/* Selected Table Info and Booking Button */}
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <span className="font-medium mr-2">Selected Table:</span>
            <span className="text-xl font-bold text-red-500">{selectedTable}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">Capacity:</span>
            <span>{selectedTable === 6 ? "4 people" : selectedTable === 1 || selectedTable === 3 ? "8 people" : selectedTable === 8 ? "10 people" : "2-4 people"}</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              const bookingData: BookingData = {
                tableId: selectedTable,
                date: selectedDate,
                time: selectedTime,
                name: "Guest",
                phone: "",
                email: "",
                specialRequests: ""
              };
              
              if (onBookingComplete) {
                onBookingComplete(bookingData);
              }
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors"
          >
            Book This Table
          </button>
        </div>
      </motion.div>
    </div>
  );
}
