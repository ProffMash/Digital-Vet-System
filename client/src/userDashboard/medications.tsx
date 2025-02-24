import { useState, useEffect } from "react";
import { getMedicines, updateMedicine, Medicine } from "../Api/medsalesApi";
import { createSale, Sale } from "../Api/salesApi";
import { Toaster, toast } from "sonner";

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
  const medicationsPerPage = 5;

  useEffect(() => {
    const fetchMedicines = async () => {
      const data = await getMedicines();
      setMedications(data);
      setFilteredMedications(data);
    };
    fetchMedicines();
  }, []);

  useEffect(() => {
    const filtered = medications.filter((med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedications(filtered);
    setCurrentPage(1);
  }, [searchTerm, medications]);

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
        medicine: selectedMedication.id,
        quantity_sold: 1,
        total_price: selectedMedication.price,
        sale_date: new Date().toISOString(),
      };
      await createSale(sale);
      toast.success("Purchase successful! Confirmation sent to your phone number.");
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
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Available Medications</h2>
        <input
  type="text"
  placeholder="Search medications..."
  value={searchTerm}
  onChange={handleSearchChange}
  className="w-64 p-2 mb-4 border rounded"
/>

        <ul>
          {currentMedications.map((med) => (
            <li key={med.id} className="p-2 border-b flex justify-between items-center">
              <span>{med.name} - ${med.price} (Qty: {med.quantity})</span>
              <button onClick={() => handlePurchase(med)} className="bg-blue-600 text-white px-4 py-2 rounded">
                Buy
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredMedications.length / medicationsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {showPaymentModal && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Purchase {selectedMedication.name}</h3>
            <div className="flex items-center mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-2 flex-1 rounded-full ${step >= s ? "bg-blue-600" : "bg-gray-200"}`} />
              ))}
            </div>

            {step === 1 && (
              <div>
                <label className="block mb-2">Phone Number</label>
                <input type="tel" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} className="w-full p-2 border rounded" required />
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="block mb-2">Card Number</label>
                <input type="text" value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} className="w-full p-2 border rounded" maxLength={16} required />
                <div className="flex space-x-4 mt-2">
                  <div>
                    <label className="block mb-2">Expiry Date</label>
                    <input type="text" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className="w-full p-2 border rounded" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <label className="block mb-2">CVV</label>
                    <input type="password" value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} className="w-full p-2 border rounded" maxLength={3} required />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p>Total: ${selectedMedication.price}</p>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="px-6 py-2 border rounded text-gray-700">
                  Back
                </button>
              )}
              <button onClick={step === 3 ? handlePayment : handleNextStep} className="px-6 py-2 bg-blue-600 text-white rounded" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : step === 3 ? "Confirm Purchase" : "Continue"}
              </button>
              <button onClick={handleCancel} className="px-6 py-2 border rounded text-gray-700">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}