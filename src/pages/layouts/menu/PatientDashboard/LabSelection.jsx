import { useState } from 'react';

const mockLabs = [
  {
    id: 1,
    name: 'HealthCare Diagnostics',
    rating: 4.5,
    reviews: 128,
    distance: '2.5 km',
    price: 599,
    address: '123 Health Avenue, Medical District',
    timings: '7:00 AM - 9:00 PM'
  },
  {
    id: 2,
    name: 'City Central Lab',
    rating: 4.8,
    reviews: 256,
    distance: '3.8 km',
    price: 649,
    address: '456 Central Road, Downtown',
    timings: '24x7'
  },
  {
    id: 3,
    name: 'Premium Diagnostics',
    rating: 4.6,
    reviews: 189,
    distance: '1.2 km',
    price: 699,
    address: '789 Premium Plaza, Uptown',
    timings: '8:00 AM - 8:00 PM'
  }
];

function LabSelection({ testId, onSelectAppointment }) {
  const [selectedLab, setSelectedLab] = useState(null);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const handleLabSelect = (labId) => {
    setSelectedLab(labId);
    // Call the onSelectAppointment function passed as a prop
    onSelectAppointment(labId);
    setAppointmentConfirmed(true); // Set appointment confirmation state
  };

  if (appointmentConfirmed) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Appointment Confirmed!</h1>
        <p className="text-gray-600">You have successfully booked an appointment with the selected lab.</p>
        {/* You can add more details or a button to go back to the main page */}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Select a Laboratory</h1>
      
      <div className="space-y-4">
        {mockLabs.map(lab => (
          <div key={lab.id} className="card cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-royal-blue">{lab.name}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-mustard" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 font-medium">{lab.rating}</span>
                    <span className="ml-1 text-gray-500">({lab.reviews} reviews)</span>
                  </div>
                  <span className="text-gray-500">{lab.distance}</span>
                </div>
              </div>
              <div className="text-right">
                < span className="text-2xl font-bold text-royal-blue">₹{lab.price}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700">Address</h3>
                <p className="text-gray-600">{lab.address}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Timings</h3>
                <p className="text-gray-600">{lab.timings}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleLabSelect(lab.id)}
                className="btn-primary"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LabSelection;