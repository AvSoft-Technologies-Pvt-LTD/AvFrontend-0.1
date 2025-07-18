import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      navigate('/track');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>

      <div className="card mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between py-2 border-b">
            <span>Test Amount</span>
            <span>₹599</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Home Collection Charges</span>
            <span>₹100</span>
          </div>
          <div className="flex justify-between py-2 font-semibold">
            <span>Total Amount</span>
            <span>₹699</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <span>UPI</span>
            </label>
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="netbanking"
                checked={paymentMethod === 'netbanking'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <span>Net Banking</span>
            </label>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full btn-primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay ₹699'}
            </button>
          </form>
        )}

        {paymentMethod === 'upi' && (
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">UPI ID</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="username@upi"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay ₹699'}
            </button>
          </form>
        )}

        {paymentMethod === 'netbanking' && (
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Select Bank</label>
              <select
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full btn-primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay ₹699'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Payment;