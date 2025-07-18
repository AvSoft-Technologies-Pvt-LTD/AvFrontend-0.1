import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar, FaMapMarkerAlt, FaHome, FaClock } from "react-icons/fa";
import axios from "axios";

const AvailableLabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const test = location.state?.test;

  const [labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [homeCollectionOnly, setHomeCollectionOnly] = useState(false);

  // Shared styles
  const iconColor = "text-[#0e1630]";
  const cardBox = "bg-white p-4 rounded shadow space-y-2";
  const subText = "text-sm text-gray-500";
  const buttonPrimary = "bg-[#0e1630] text-white hover:bg-[#F4C430] hover:text-[#0e1630] px-4 py-2 rounded";

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/0eb1c58c-375e-4f72-8cde-a24363acc17e")
      .then((res) => {
        setLabs(res.data);
        setFilteredLabs(res.data); // Initial unfiltered display
      })
      .catch((err) => console.error("Lab API Error:", err));
  }, []);

  const handleFilter = () => {
    let filtered = [...labs];

    if (locationFilter.trim()) {
      filtered = filtered.filter(lab =>
        lab.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (homeCollectionOnly) {
      filtered = filtered.filter(lab => lab.homeCollection === true);
    }

    setFilteredLabs(filtered);
  };

  if (!test) return <div className="p-4">No test selected.</div>;

  return (
    <div className="p-6 w-full mx-auto space-y-4">
      {/* Back Button */}
      <div className="flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-[#0e1630] mb-2">
          &larr; Back to Test Details
        </button>
      </div>

      {/* Test Info */}
      <div className={cardBox}>
        <h2 className="text-xl font-bold">Labs for {test.title}</h2>
        <p className={subText}>Code: {test.code}</p>
        {/* <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {test.category}
        </span> */}
        <span className="text-xs bg-blue-100 text-[#0e1630] px-2 py-1 rounded">
          {test.description}
        </span>
        <p className="mt-2 text-green-700 font-semibold">
          Price: ₹{test.price}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-1200 sm:w-auto">
          <input
            type="text"
            placeholder="Filter by location"
            className="rounded shadow p-2 w-5 sm:w-auto flex-1 mb-2 sm:mb-0"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <button
            onClick={handleFilter}
            className={buttonPrimary}
          >
            Search
          </button>
        </div>

        {/* Home Collection Filter */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={homeCollectionOnly}
            onChange={() => {
              setHomeCollectionOnly(!homeCollectionOnly);
              setTimeout(() => handleFilter(), 0);
            }}
          />
          <span>Home Collection</span>
        </label>
      </div>

      {/* Filtered Labs */}
      {filteredLabs.length === 0 ? (
        <p className="text-gray-500 text-center">No labs found for selected filters.</p>
      ) : (
        filteredLabs.map((lab, index) => (
          <div key={index} className={cardBox}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{lab.name}</h3>
                <p className={`${subText} flex items-center gap-1`}>
                  <FaMapMarkerAlt className={iconColor} /> {lab.location}
                </p>
              </div>
              <span className="flex items-center text-green-600 text-sm font-medium gap-1">
                <FaStar className="text-[#F4C430]" />
                {lab.rating || 'N/A'}
              </span>
            </div>

            <ul className="text-sm text-gray-600 space-y-1 mt-2">
              <li className="flex items-center gap-2">
                <FaClock className={iconColor} />
                Reports in {lab.reportTime || '24 hours'}
              </li>
              <li className="flex items-center gap-2">
                <FaHome className={iconColor} />
                Home Collection {lab.homeCollection ? 'Available' : 'Not available'}
              </li>
            </ul>

            <div className="flex justify-between items-center mt-3">
              <p className="text-green-700 font-semibold">₹{test.price}</p>
              <button
                onClick={() =>
                  navigate(`/dashboard/lab-booking/${test.id}`, {
                    state: { lab, test },
                  })
                }
                className={buttonPrimary}
              >
                Select Lab
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AvailableLabs;
