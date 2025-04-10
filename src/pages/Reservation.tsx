import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { TableReservation, BookingData } from '../shared/components/reservation';

export default function Reservation() {
  const { reservation } = useSiteContent();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(new Date().toTimeString().slice(0, 5));

  const handleBookingComplete = (bookingData: BookingData): void => {
    // Handle booking logic here
    alert(`Table ${bookingData.tableId} booked for ${bookingData.date} at ${bookingData.time}`);
    // In a real application, you would send this data to your backend
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div className="">
      <div className="max-w-full mx-auto px-4 ">
        {/* Date and Time inputs are now moved to the TableReservation component */}

        {/* Table Reservation Component */}
        <TableReservation 
          onBookingComplete={handleBookingComplete}
          initialDate={selectedDate}
          initialTime={selectedTime}
          reservationContent={reservation}
        />

        {/* Additional content can be added here if needed */}
      </div>
    </div>
  );
}
