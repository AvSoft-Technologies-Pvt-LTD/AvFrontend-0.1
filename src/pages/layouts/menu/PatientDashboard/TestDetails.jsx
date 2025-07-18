import { useState } from 'react';



function TestDetails({ testId, onSelectLab }) {
  
  const mockTest = {
    id: 1,
  name: 'Complete Blood Count (CBC)',
  price: 599,
  description: 'A Complete Blood Count (CBC) is a blood test that measures various components and features of your blood.',
  category: 'test',
  preparation: 'Fasting for 8-12 hours required',
  reportTime: '24 hours',
  components: [
    'Red Blood Cell (RBC) count',
    'White Blood Cell (WBC) count',
    'Hemoglobin',
    'Hematocrit',
    'Platelet count'
  ],
  benefits: [
    'Detect anemia or other blood disorders',
    'Screen for infection',
    'Monitor overall health',
    'Check blood cell production'
  ]
};
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-royal-blue mb-2">{mockTest.name}</h1>
        <p className="text-gray-600">{mockTest.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Test Components</h2>
          <ul className="space-y-2">
            {mockTest.components.map((component, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-royal-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {component}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Benefits</h2>
          <ul className="space-y-2">
            {mockTest.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-mustard mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Price</h2>
            <p className="text-3xl font-bold text-royal-blue">₹{mockTest.price}</p>
          </div>
          <div className="space-y-2">
            
          <button
        onClick={() => onSelectLab(testId)}
        className="btn-primary"
      >
        Select Lab
      </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Preparation Required</h3>
            <p className="text-gray-600">{mockTest.preparation}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Report Time</h3>
            <p className="text-gray-600">{mockTest.reportTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestDetails;
