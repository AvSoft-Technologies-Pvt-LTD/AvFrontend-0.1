import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../context-api/cartSlice';
import axios from 'axios';
import { ShoppingCart, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Custom hook for search functionality
const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const performSearch = (data) => {
    if (!searchQuery.trim()) return data;
    return data.filter(test =>
      test.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return { searchQuery, setSearchQuery, performSearch };
};

const LabHome = () => {
  const [activeTab, setActiveTab] = useState('tests');
  const [tests, settests] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery, performSearch } = useSearch();

  const MOCK_API_URL = 'https://mocki.io/v1/855f16b5-9d2b-432c-8d1f-f47f1a7c5cf9';

  // Style constants
  const buttonPrimary = 'bg-[#0e1630] text-white hover:bg-[#F4C430] hover:text-[#0e1630] px-3 py-1 text-sm rounded';
  const buttonSecondary = 'bg-gray-100 px-3 py-1 text-sm rounded';
  const packageCard = 'rounded-lg shadow bg-white p-4';
  const testCard = 'p-4 rounded-lg shadow bg-white';

  useEffect(() => {
    setLoading(true);
    axios
      .get(MOCK_API_URL)
      .then(res => {
        const data = res.data[activeTab] || [];
        settests(performSearch(data));
        setPackages(res.data.packages || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeTab, searchQuery]);

  const handleSearchSubmit = e => {
    e.preventDefault();
    // Handled by useEffect
  };

  return (
    <div className="relative">
      {/* Header Section */}
      <div className="flex justify-between tests-center p-4 mb-6">
        <form onSubmit={handleSearchSubmit} className="hidden md:flex tests-center flex-1 max-w-xl mx-4 relative">
          <input
            type="text"
            placeholder="Search for tests, scans..."
            className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute top-3 right-3 text-gray-500 hover:text-blue-600">
            <Search size={20} />
          </button>
        </form>

        <div className="relative cursor-pointer flex tests-center text-gray-700 hover:text-blue-600" onClick={() => navigate('/dashboard/cart')}>
          <ShoppingCart size={20} className="mr-1" />
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#0e1630] text-white text-xs w-5 h-5 flex tests-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {/* Tab Section */}
      <div className="px-4 mb-6">
        <button
          className={`py-1 px-4 text-center font-medium text-sm border-b-2 ${activeTab === 'tests' ? 'border-[#0e1630] text-[#0e1630]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          onClick={() => setActiveTab('tests')}
        >
          Tests
        </button>
        <button
          className={`py-1 px-4 text-center font-medium text-sm border-b-2 ${activeTab === 'scans' ? 'border-[#0e1630] text-[#0e1630]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          onClick={() => setActiveTab('scans')}
        >
          Scans
        </button>
      </div>

      {/* test List Grid */}
      <div className="px-4">
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tests.map(test => (
              <div key={test.id} className={testCard}>
                <h2 className="font-semibold text-lg">{test.title}</h2>
                <p className="text-sm text-gray-500">Code: {test.code}</p>
                <p className="text-sm text-gray-600 mt-1 mb-2">{test.description}</p>
                <p className="text-[#0e1630] font-bold text-lg">₹{test.price}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    className={buttonSecondary}
                    onClick={() => navigate(`/dashboard/lab-tests/test/${test.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className={buttonPrimary}
                    onClick={() => dispatch(addToCart(test))}
                  >
                    + Add
                  </button>
                  <button
                className={buttonPrimary}
                onClick={() => navigate('/dashboard/cart')}
              >
                Book Now
              </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Health Packages */}
      <div className="px-4 mt-12">
        <h2 className="text-xl font-bold mb-6">Popular Health Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {packages.map(pkg => (
            <div key={pkg.id} className={packageCard}>
              <div className="flex justify-between tests-center mb-2">
                <h3 className="font-semibold text-lg">{pkg.title}</h3>
                <span className="bg-blue-100 text-[#0e1630] text-xs px-2 py-1 rounded-full">
                  {pkg.testsCount} Tests
                </span>
              </div>
              <div className="mb-2">
                <span className="text-lg font-bold text-[#0e1630]">₹{pkg.price}</span>
                {pkg.originalPrice && (
                  <span className="text-sm text-gray-400 line-through ml-2">₹{pkg.originalPrice}</span>
                )}
              </div>
              <button
                className={buttonPrimary}
                onClick={() => navigate('/dashboard/cart')}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabHome;
