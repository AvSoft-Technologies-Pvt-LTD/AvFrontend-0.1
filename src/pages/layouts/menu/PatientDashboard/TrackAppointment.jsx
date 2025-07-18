import { useState, useEffect } from 'react';

function TrackAppointment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTrackingComplete, setIsTrackingComplete] = useState(false);

  const steps = [
    { id: 1, title: 'Appointment Confirmed', date: 'Wed, 16th Mar' },
    { id: 2, title: 'Technician On the Way', date: 'Wed, 16th Mar' },
    { id: 3, title: 'Sample Collected', date: 'Wed, 16th Mar' },
    { id: 4, title: 'Test Processing', date: 'Wed, 17th Mar' },
    { id: 5, title: 'Report Ready', date: 'Wed, 17th Mar' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length) return prev + 1;
        clearInterval(interval);
        setIsTrackingComplete(true);
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">
        {isTrackingComplete ? 'Tracking Complete' : 'Track Your Appointment'}
      </h1>
      {isTrackingComplete ? (
        <p className="text-gray-600">Your report is ready. Thank you for your patience!</p>
      ) : (
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-4 top-8 w-0.5 h-full ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
              <div className="flex items-start">
                <div
                  className={`z-10 flex items-center justify-center w-8 h-8 rounded-full text-sm ${
                    currentStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <div className="ml-4">
                  <h3
                    className={`font-semibold ${
                      currentStep >= step.id ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400">{step.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackAppointment;
