import { useState } from 'react';

function Appointment({ onProceedToPayment }) {
  const [appointmentType, setAppointmentType] = useState('home');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppointmentConfirmed(true); // Set appointment confirmation state
    onProceedToPayment(); // Call the function to proceed to payment
  };

  if (appointmentConfirmed) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Appointment Scheduled!</h1>
        <p className="text-gray-600">Your appointment has been successfully scheduled.</p>
        <p className="text-gray-600">Type: {appointmentType === 'home' ? 'Home Sample Collection' : 'Visit Lab'}</p>
        <p className="text-gray-600">Date: {selectedDate}</p>
        <p className="text-gray-600">Time Slot: {selectedTime}</p>
        {/* You can add more details or a button to go back to the main page */}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Schedule Your Appointment</h1>
      
      <div className="card mb-6">
        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-3 rounded-lg ${
              appointmentType === 'home'
                ? 'bg-royal-blue text-black'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setAppointmentType('home')}
          >
            Home Sample Collection
          </button>
          <button
            className={`flex-1 py-3 rounded-lg ${
              appointmentType === 'lab'
                ? 'bg-royal-blue text-black'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setAppointmentType('lab')}
          >
            Visit Lab
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {appointmentType === 'home' && (
            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows="3"
                placeholder="Enter your complete address"
                required
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Time Slot</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              >
                <option value="">Select a time slot</option>
                <option value="08:00">08:00 AM - 09:00 AM</option>
                <option value="09:00">09:00 AM - 10:00 AM</option>
                <option value="10:00">10:00 AM - 11:00 AM</option>
                <option value="11:00">11:00 AM - 12:00 PM</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full btn-primary">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;