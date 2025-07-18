import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart, clearCart } from '../../../../context-api/cartSlice';
import { ShoppingCart, Trash2, ArrowLeft, PlusCircle } from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const subtotal = cart.reduce((sum, test) => sum + test.price, 0);

  // Class declarations for reuse
  const containerClass = 'p-6 bg-gray-50 min-h-screen';
  const buttonClass = 'flex items-center text-sm text-gray-600 mb-6 hover:underline';
  const headingClass = 'text-3xl font-bold';
  const cartHeaderClass = 'flex items-center mb-6';
  const cartTitleClass = 'font-medium text-lg';
  const cartDescriptionClass = 'text-sm text-gray-500';
  const cartPriceClass = 'text-lg font-semibold text-[#0e1630] ';
  const cartOriginalPriceClass = 'line-through text-gray-400 text-sm';
  const orderSummaryClass = 'bg-white p-6 rounded-2xl shadow-md space-y-6';
  const orderSummaryHeadingClass = 'text-xl font-semibold mb-4';
  const orderTotalClass = 'flex justify-between text-lg font-bold text-[#0e1630] ';
  const removeButtonClass = 'text-red-500 text-sm mt-3 hover:underline';

  return (
    <div className={containerClass}>
      <button onClick={() => navigate('/dashboard/lab-tests')} className={buttonClass}>
        <ArrowLeft size={16} className="mr-2" /> Continue Shopping
      </button>

      <div className={cartHeaderClass}>
        <ShoppingCart size={28} className="text-[#0e1630]  mr-2" />
        <h2 className={headingClass}>Your Cart</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart tests */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Cart tests ({cart.length})</h3>
              <button onClick={() => dispatch(clearCart())} className="text-red-500 text-sm hover:underline">
                <Trash2 size={16} className="inline mr-1" /> Clear All
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-10">Your cart is empty. Start adding tests!</p>
            ) : (
              cart.map(test => (
                <div key={test.id} className="border-t pt-6 mt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={cartTitleClass}>{test.title}</h4>
                      <p className={cartDescriptionClass}>Code: <span className="bg-gray-100 px-2 py-0.5 rounded">{test.code}</span></p>
                      {test.fastRequired && (
                        <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Fasting Required
                        </span>
                      )}
                      <p className="text-sm mt-2 text-gray-700">{test.description}</p>
                    </div>
                    <div className="text-right">
                      <p className={cartPriceClass}>₹{test.price}</p>
                      {test.originalPrice && (
                        <p className={cartOriginalPriceClass}>₹{test.originalPrice}</p>
                      )}
                      <button onClick={() => dispatch(removeFromCart(test.id))} className={removeButtonClass}>
                      <Trash2 size={16} className="inline mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className={orderSummaryClass}>
          <h3 className={orderSummaryHeadingClass}>Order Summary</h3>

          {cart.map(test => (
            <div key={test.id} className="flex justify-between text-gray-700">
              <span>{test.title}</span>
              <span>₹{test.price}</span>
            </div>
          ))}

          <div className="border-t pt-3 flex justify-between font-semibold text-gray-800">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className={orderTotalClass}>
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button
            className="bg-[#0e1630] text-white hover:bg-[#F4C430] hover:text-[#0e1630]  py-2 px-4 rounded-xl w-full "
            onClick={() => navigate(`/dashboard/available-labs/${cart[0]?.id}`, { state: { test: cart[0] } })}
          >
            Proceed to Book
          </button>

          <p className="text-xs text-gray-500 text-center">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
