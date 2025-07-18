import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { addToCart } from '../../../../context-api/cartSlice';

import {
  FaClock,
  FaFlask,
  FaStar,
  FaCheck,
  FaFileMedicalAlt,
  FaMicroscope,
  FaArrowLeft,
} from 'react-icons/fa';

const TestDetail = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // Common style classes
  const cardBox = "bg-white p-6 rounded-lg shadow";
  const buttonPrimary = "bg-[#0e1630] text-white hover:bg-[#F4C430] hover:text-[#0e1630] px-4 py-2 rounded";
  const subText = "text-sm text-gray-600";
  const headingIcon = "flex items-center gap-2 text-lg font-semibold mb-2";
  const infoItem = "flex items-start gap-2 mb-2";
  const iconColor = "text-[#0e1630]";

  useEffect(() => {
    axios
      .get('https://mocki.io/v1/3a488cfd-e319-42bb-aad6-a3a776949639')
      .then((res) => {
        const found = Array.isArray(res.data)
          ? res.data.find((i) => i.id.toString() === id)
          : null;
        setTest(found);
      })
      .catch((err) => console.error('API Error:', err));
  }, [id]);

  if (!test) return <div className="p-4">Loading or Not Found...</div>;

  return (
    <div className="p-6 space-y-6 w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-4">
        <button onClick={() => window.history.back()} className="text-[#0e1630] flex items-center gap-1">
          <FaArrowLeft className={iconColor} /> Back
        </button>

        <div
          className="relative cursor-pointer flex items-center text-gray-700 hover:text-blue-600"
          onClick={() => navigate('/dashboard/cart')}
        >
          <ShoppingCart size={20} className="mr-1" />
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#0e1630] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {/* Test Info Card */}
      <div className={cardBox}>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <FaFileMedicalAlt className={iconColor} /> {test.title}
        </h1>

        <p className={subText}>Code: {test.code}</p>
        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
          {test.category}
        </span>

        <p className="text-gray-700 mt-4">{test.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-xl font-bold text-green-700">₹{test.price}</p>
            {test.originalPrice && (
              <p className="text-sm line-through text-gray-400">₹{test.originalPrice}</p>
            )}
          </div>
          <button className={buttonPrimary} onClick={() => dispatch(addToCart(test))}>
            + Add to Cart
          </button>
        </div>

        <div className="flex space-x-6 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaClock className={iconColor} /> Report: {test.reportTime || '24 hours'}
          </div>
          <div className="flex items-center gap-1">
            <FaFlask className={iconColor} />
            {test.fasting ? 'Fasting required' : 'No fasting required'}
          </div>
        </div>
      </div>

      {/* Lab Compare Box */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex justify-between items-center">
        <div>
          <p className="font-semibold mb-1">Find the best labs for {test.title}</p>
          <p className={subText}>Compare prices, check availability, and book appointments.</p>
        </div>
        <button
          className={buttonPrimary}
          onClick={() => navigate(`/dashboard/available-labs/${test.id}`, { state: { test } })}
        >
          View Available Labs
        </button>
      </div>

      {/* About Section */}
      <div className={cardBox}>
        <h2 className={headingIcon}>
          <FaMicroscope className={iconColor} />
          About {test.title}
        </h2>

        <p className={infoItem}>
          <FaCheck className={iconColor} />
          <span><strong>What is it?</strong> {test.about}</span>
        </p>

        <p className={infoItem}>
          <FaCheck className={iconColor} />
          <span><strong>Why is it done?</strong> {test.why}</span>
        </p>

        <p className={infoItem}>
          <FaCheck className={iconColor} />
          <span>
            <strong>Preparation Required:</strong> {test.fasting ? 'Fasting required' : 'No fasting required'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TestDetail;
