import { useState, useEffect } from "react";
import { getMedicines, updateMedicine, Medicine } from "../Api/medsalesApi";
import { createSale, Sale } from "../Api/salesApi";
import { Toaster, toast } from "sonner";
import { Search, CreditCard, Smartphone, CheckCircle, ArrowLeft, X, Info } from "lucide-react";

export default function Medications() {
  const [medications, setMedications] = useState<Medicine[]>([]);
  const [filteredMedications, setFilteredMedications] = useState<Medicine[]>([]);
  const [selectedMedication, setSelectedMedication] = useState<Medicine | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    phoneNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showTooltip, setShowTooltip] = useState(true);
  const medicationsPerPage = 5;

  // Fetch medications from the API
  const fetchMedicines = async () => {
    const data = await getMedicines();
    setMedications(data);
    setFilteredMedications(data);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    const filtered = medications.filter((med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedications(filtered);
    setCurrentPage(1);
  }, [searchTerm, medications]);

  useEffect(() => {
    if (showPaymentModal) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 1000); // Hide tooltip after 1 seconds
      return () => clearTimeout(timer);
    }
  }, [showPaymentModal, step]);

  const handlePurchase = (medication: Medicine) => {
    setSelectedMedication(medication);
    setStep(1);
    setShowPaymentModal(true);
  };

  const handleNextStep = () => {
    if (step === 1 && form.phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (step === 2 && (form.cardNumber.length < 16 || form.expiryDate.length < 5 || form.cvv.length < 3)) {
      toast.error("Please enter valid card details.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePayment = async () => {
    if (!selectedMedication) return;
    setIsSubmitting(true);

    try {
      if (selectedMedication.id === undefined) {
        throw new Error("Medication ID is undefined");
      }
      await updateMedicine(selectedMedication.id, {
        ...selectedMedication,
        quantity: selectedMedication.quantity - 1,
      });
      const sale: Sale = {
        medicine_name: selectedMedication.name,
        medicine: selectedMedication.id,
        quantity_sold: 1,
        total_price: selectedMedication.price,
        sale_date: new Date().toISOString(),
      };
      await createSale(sale);
      toast.success("Purchase successful! Confirmation sent to your phone number.");

      // Refresh the medication list after purchase
      await fetchMedicines();

      setTimeout(() => {
        setShowPaymentModal(false);
        setStep(1);
        setForm({ phoneNumber: "", cardNumber: "", expiryDate: "", cvv: "" });
      }, 1500);
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowPaymentModal(false);
    setStep(1);
    setForm({ phoneNumber: "", cardNumber: "", expiryDate: "", cvv: "" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastMedication = currentPage * medicationsPerPage;
  const indexOfFirstMedication = indexOfLastMedication - medicationsPerPage;
  const currentMedications = filteredMedications.slice(indexOfFirstMedication, indexOfLastMedication);

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Medications</h2>
        <div className="relative w-full max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search medications..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {currentMedications.map((med) => (
              <li key={med.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex justify-between items-center">
                  <div>
                  <h3 className="text-lg font-semibold text-gray-900">{med.name}</h3>
                  <p className="text-sm text-gray-600">${med.price} | Qty: {med.quantity}</p>
                  </div>
                  <button
                    onClick={() => handlePurchase(med)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Buy
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center mt-6">
          {Array.from({ length: Math.ceil(filteredMedications.length / medicationsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 border rounded-lg transition-colors duration-200 ${
                currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {showPaymentModal && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Purchase {selectedMedication.name}</h3>
              <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                    step >= s ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {step === 1 && (
              <div className="animate-slide-in relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    value={form.phoneNumber}
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                {showTooltip && (
                  <div className="absolute top-0 left-0 mt-2 ml-2 bg-blue-100 p-2 rounded-lg shadow-lg flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-blue-800">Enter your phone number to receive a confirmation message.</p>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="animate-slide-in relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={form.cardNumber}
                    onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Card Number"
                    maxLength={16}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <input
                      type="text"
                      value={form.expiryDate}
                      onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      value={form.cvv}
                      onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="CVV"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
                {showTooltip && (
                  <div className="absolute top-0 left-0 mt-2 ml-2 bg-blue-100 p-2 rounded-lg shadow-lg flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-blue-800">Enter your card details to proceed with the payment.</p>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="animate-slide-in relative">
                <p className="text-lg font-semibold text-gray-900">Total: ${selectedMedication.price}</p>
                <p className="text-sm text-gray-600 mt-2">Review your order and confirm the purchase.</p>
                {showTooltip && (
                  <div className="absolute top-0 left-0 mt-2 ml-2 bg-blue-100 p-2 rounded-lg shadow-lg flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-blue-800">Review your order and confirm the purchase.</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 inline-block" /> Back
                </button>
              )}
              <button
                onClick={step === 3 ? handlePayment : handleNextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : step === 3 ? <CheckCircle className="h-5 w-5 inline-block" /> : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}