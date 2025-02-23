import { useState } from "react";

interface Medication {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const medications: Medication[] = [
  { id: 1, name: "Paracetamol", category: "Painkiller", price: 5, quantity: 10 },
  { id: 2, name: "Amoxicillin", category: "Antibiotic", price: 12, quantity: 5 },
  { id: 3, name: "Vitamin C", category: "Supplement", price: 8, quantity: 20 },
];

export default function Medications() {
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePurchase = (medication: Medication) => {
    setSelectedMedication(medication);
    setStep(1); // Start at step 1
    setShowPaymentModal(true);
  };

  const handleNextStep = () => {
    if (step === 1 && phoneNumber.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }
    if (step === 2 && (cardNumber.length < 16 || expiryDate.length < 5 || cvv.length < 3)) {
      alert("Please enter valid card details.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleConfirmPayment = () => {
    alert("Payment Successful! 🎉");
    setShowPaymentModal(false);
    setSelectedMedication(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Medications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medications.map((med) => (
          <div key={med.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium">{med.name}</h3>
            <p className="text-gray-600">Category: {med.category}</p>
            <p className="text-gray-800 font-semibold">Price: ${med.price}</p>
            <p className="text-gray-500">Stock: {med.quantity}</p>
            <button
              onClick={() => handlePurchase(med)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>

      {showPaymentModal && selectedMedication && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-2">Payment for {selectedMedication.name}</h3>
            <p className="text-gray-800 font-semibold mb-4">Total: ${selectedMedication.price}</p>

            {/* Step 1: Enter Phone Number */}
            {step === 1 && (
              <div>
                <label className="block text-gray-700 font-medium">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border p-2 w-full rounded mt-1"
                  placeholder="Enter phone number"
                />
              </div>
            )}

            {/* Step 2: Enter Card Details */}
            {step === 2 && (
              <div>
                <label className="block text-gray-700 font-medium">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="border p-2 w-full rounded mt-1"
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={16}
                />

                <div className="flex space-x-4 mt-2">
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium">Expiry Date</label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="border p-2 w-full rounded mt-1"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium">CVV</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="border p-2 w-full rounded mt-1"
                      placeholder="CVV"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirm Payment */}
            {step === 3 && (
              <div className="text-center">
                <p className="text-gray-700 mb-4">
                  You are about to pay <span className="font-semibold">${selectedMedication.price}</span> for{" "}
                  <span className="font-semibold">{selectedMedication.name}</span>.
                </p>
                <p className="text-green-600 font-semibold">Phone: {phoneNumber}</p>
                <p className="text-gray-600">Card: **** **** **** {cardNumber.slice(-4)}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
              {step < 3 ? (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  onClick={handleConfirmPayment}
                >
                  Confirm Payment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
