import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const mockTests = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    price: 599,
    description: 'Measures different components of blood including RBC, WBC, and platelets',
    category: 'test',
    preparation: 'Fasting for 8-12 hours required',
    reportTime: '24 hours'
  },
  {
    id: 2,
    name: 'Lipid Profile',
    price: 799,
    description: 'Measures cholesterol levels and other blood fats',
    category: 'test',
    preparation: 'Fasting for 12 hours required',
    reportTime: '24 hours'
  },
  {
    id: 3,
    name: 'Chest X-Ray',
    price: 899,
    description: 'Digital X-ray imaging of the chest area',
    category: 'scan',
    preparation: 'No special preparation required',
    reportTime: 'Same day'
  },
  {
    id: 4,
    name: 'MRI Brain',
    price: 8999,
    description: 'Detailed imaging of brain structure',
    category: 'scan',
    preparation: 'No metal objects allowed',
    reportTime: '24-48 hours'
  },
  {
    id: 5,
    name: 'Health Checkup Package',
    price: 2499,
    description: 'Comprehensive health screening including blood tests and vital checks',
    category: 'test',
    preparation: 'Fasting for 12 hours required',
    reportTime: '48 hours'
  }
];
function LabTests({ onSelectTest }) {
  const [activeTab, setActiveTab] = useState('test');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTests = mockTests.filter(test => 
    test.category === activeTab && 
    (test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     test.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-royal-blue">Lab Tests & Scans</h1>
          <button className="btn-secondary flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Upload Prescription</span>
          </button>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search tests, scans, or packages..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'test'
                ? 'bg-royal-blue text-black bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('test')}
          >
            Tests & Packages
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'scan'
                ? 'bg-royal-blue text-Black bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('scan')}
          >
            Scans & Imaging
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map(test => (
          <div key={test.id} className="card hover:shadow-lg transition-shadow p-4 rounded-lg border">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-royal-blue">{test.name}</h3>
              <span className="bg-yellow-200 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                ₹{test.price}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{test.description}</p>
            <div className="space-y-2 mb-4 text-sm">
              <div><strong>Preparation:</strong> {test.preparation}</div>
              <div><strong>Report Time:</strong> {test.reportTime}</div>
            </div>
            <div className="flex justify-between items-center">
            <button
              onClick={() => onSelectTest(test.id)}
              className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
                View Details
              </button>
              <button
                className="btn-secondary px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => {}}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LabTests;
