import React, { useState } from "react";

// Reusable InputField component
const InputField = ({ label, placeholder, type = "text", value, onChange, error, inputClassName }) => (
  <div>
    <label className="block text-gray-700 text-sm mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded-md ${error ? "border-red-500" : "border-gray-300"} ${inputClassName}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Step2 = ({
  handleBack,
  paymentMethod,
  setPaymentMethod,
  cardDetails,
  setCardDetails,
  gpayDetails,
  setGpayDetails,
  netbankingDetails,
  setNetbankingDetails,
  cardErrors,
  gpayErrors,
  netbankingErrors,
  validateFields,
  setShowConfirmationModal,
  showConfirmationModal,
  handlePayment,
  location,
  symptoms,
  date,
  time,
  specialty,
  consultationType,
  selectedDoctor,
  mobile,
}) => {
  const [bankSearch, setBankSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmation = () => {
    const isValid = validateFields();
    if (isValid) {
      setShowConfirmationModal(true);
    }
  };
  const handlePayClick = () => {
    setShowConfirmationModal(true);
  };
  

  return (
    <div className="step2-container p-4 space-y-6">
      <h2 className="text-xl font-semibold">Payment Details</h2>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {['Card', 'GPay', 'NetBanking'].map((method) => (
          <label
            key={method}
            className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
              paymentMethod === method
                ? 'border-blue-800 bg-blue-50 font-semibold'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="hidden"
            />
            {method}
          </label>
        ))}
      </div>

      {/* Card Payment Fields */}
      {paymentMethod === "Card" && (
        <div className="space-y-4">
          <InputField
            label="Card Number"
            placeholder="Enter your card number"
            value={cardDetails.number}
            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
            error={cardErrors.number}
            inputClassName="focus:border-green-500"
          />
          <InputField
            label="Name on Card"
            placeholder="Enter name on card"
            value={cardDetails.name}
            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
            error={cardErrors.name}
            inputClassName="focus:border-green-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Expiry (MM/YY)"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              error={cardErrors.expiry}
              inputClassName="focus:border-green-500"
            />
            <InputField
              label="CVV"
              placeholder="CVV"
              type="password"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              error={cardErrors.cvv}
              inputClassName="focus:border-green-500"
            />
          </div>
        </div>
      )}

      {/* GPay Payment Fields */}
      {paymentMethod === "GPay" && (
        <div className="space-y-4">
          <InputField
            label="GPay Email"
            placeholder="example@gmail.com"
            value={gpayDetails.email}
            onChange={(e) => setGpayDetails({ ...gpayDetails, email: e.target.value })}
            error={gpayErrors.email}
            inputClassName="focus:border-green-500"
          />
          <InputField
            label="Registered Mobile"
            placeholder="10-digit mobile number"
            type="tel"
            value={gpayDetails.mobile}
            onChange={(e) => setGpayDetails({ ...gpayDetails, mobile: e.target.value })}
            error={gpayErrors.mobile}
            inputClassName="focus:border-green-500"
          />
          <InputField
            label="Transaction ID (Optional)"
            placeholder="Txn1234..."
            value={gpayDetails.transactionId}
            onChange={(e) => setGpayDetails({ ...gpayDetails, transactionId: e.target.value })}
            inputClassName="focus:border-green-500"
          />
        </div>
      )}

      {/* Net Banking Fields */}
      {paymentMethod === "NetBanking" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Search Bank"
            value={bankSearch}
            onChange={(e) => setBankSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:border-green-500"
          />
          <div className="max-h-40 overflow-y-auto space-y-2">
            {["HDFC", "ICICI", "SBI", "Axis", "Kotak", "PNB", "BOB", "Yes Bank"]
              .filter((bank) => bank.toLowerCase().includes(bankSearch.toLowerCase()))
              .map((bank) => (
                <label key={bank} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="selectedBank"
                    value={bank}
                    checked={netbankingDetails.bankName === bank}
                    onChange={(e) => setNetbankingDetails({ ...netbankingDetails, bankName: e.target.value })}
                  />
                  <span>{bank}</span>
                </label>
              ))}
          </div>
          {netbankingErrors.bankName && (
            <p className="text-red-500 text-sm mt-1">{netbankingErrors.bankName}</p>
          )}
        </div>
      )}

      {/* Buttons */}
     {/* Pay & Book Button */}
     <div className="flex justify-end mt-7">
    <button
  type="button"
  onClick={handlePayment}
  disabled={isLoading}
  className={`flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-medium shadow-lg 
    ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-800'}`}
>
  {isLoading ? (
    <>
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      Processing...
    </>
  ) : (
    'Pay'
  )}
</button>
</div>


      {/* Confirmation Modal */}
      {showConfirmationModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Appoitment Book sucessfully</h2>
      
      <div className="mt-4">
        <p className="font-semibold">Appointment Details:</p>
        <p>Location: {location}</p>
        <p>Symptoms: {symptoms}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Specialty: {specialty}</p>
        <p>Consultation Type: {consultationType}</p>
        <p>Doctor: {selectedDoctor?.name}</p>
        <p>Mobile: {mobile}</p>
        <p>Payment Method: {paymentMethod}</p>
      </div>
      <div className="mt-6 flex justify-end">
        
        <button
          type="button"
          onClick={() => setShowConfirmationModal(false)}
          className="ml-2 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Step2;
