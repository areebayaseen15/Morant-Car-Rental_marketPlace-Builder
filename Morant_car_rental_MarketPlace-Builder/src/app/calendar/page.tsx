'use client';
import React, { useState } from 'react';
import Navbar from '../Components/navbar';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const timeSlots = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const startingDay = monthStart.getDay();

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setBookingSuccess(true);
      setSelectedDate(null);
      setSelectedTime('');
      setTimeout(() => setBookingSuccess(false), 3000); 
    }
  };

  return (
  <div>
    <Navbar/>
    <div className="relative mt-40 min-h-screen p-8 bg-blue-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Select Rental Date & Time</h1>

        {bookingSuccess && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
            Booking successful! Your reservation has been made.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 text-gray-800 dark:text-gray-200 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2 text-gray-800 dark:text-gray-300">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                  &lt; Previous
                </button>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                  Next &gt;
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4 text-gray-800 dark:text-gray-300">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-gray-500 dark:text-gray-400 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-gray-800 dark:text-gray-300">
              {Array.from({ length: daysInMonth + startingDay }).map((_, index) => {
                const dayNumber = index - startingDay + 1;
                const isCurrentDay = dayNumber === new Date().getDate() && 
                  currentMonth.getMonth() === new Date().getMonth();

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber))}
                    className={`p-4 rounded-lg text-center transition-all
                      ${dayNumber < 1 ? 'invisible' : ''} 
                      ${selectedDate?.getDate() === dayNumber ? 
                        'bg-blue-500 dark:bg-blue-700 text-white' : 
                        isCurrentDay ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                      ${dayNumber < new Date().getDate() && currentMonth.getMonth() === new Date().getMonth() ? 
                        'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={dayNumber < new Date().getDate() && currentMonth.getMonth() === new Date().getMonth()}
                  >
                    {dayNumber > 0 ? dayNumber : ''}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Select Time</h3>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg text-sm ${selectedTime === time ? 
                      'bg-blue-500 dark:bg-blue-700 text-white' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t dark:border-gray-600 pt-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Booking Summary</h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Selected Date:</span>
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between text-gray-800 dark:text-gray-300">
                  <span>Selected Time:</span>
                  <span className="font-medium">{selectedTime || '--:-- --'}</span>
                </div>
                <div className="flex justify-between border-t dark:border-gray-600 pt-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">$85.00/day</span>
                </div>
              </div>

              <button 
                onClick={handleBooking}
                className="w-full mt-6 bg-blue-600 dark:bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                disabled={!selectedDate || !selectedTime}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};

export default CalendarPage
