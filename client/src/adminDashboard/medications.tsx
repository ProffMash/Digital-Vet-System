import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { getMedicines, createMedicine, updateMedicine, deleteMedicine, Medicine } from '../Api/medsalesApi'; // Adjust the import path as needed

export default function MedicationsManagement() {
  const [medications, setMedications] = useState<Medicine[]>([]);
  const [filteredMedications, setFilteredMedications] = useState<Medicine[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    expiry_date: '',
  });
  const [editMedication, setEditMedication] = useState<Medicine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
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
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedications(filtered);
    setCurrentPage(1);
  }, [searchTerm, medications]);

  const handleAddMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedMedication = await createMedicine(newMedication);
      setMedications([...medications, addedMedication]);
      setShowAddModal(false);
      setNewMedication({
        name: '',
        category: '',
        price: 0,
        quantity: 0,
        expiry_date: '',
      });
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

  const handleEditMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editMedication) return;
    try {
      const updatedMedication = await updateMedicine(editMedication.id!, editMedication);
      setMedications(medications.map(med => (med.id === updatedMedication.id ? updatedMedication : med)));
      setShowEditModal(false);
      setEditMedication(null);
    } catch (error) {
      console.error('Error updating medication:', error);
    }
  };

  const handleDeleteMedication = async (id: number) => {
    if (confirm('Are you sure you want to delete this medication?')) {
      try {
        await deleteMedicine(id);
        setMedications(medications.filter(med => med.id !== id));
      } catch (error) {
        console.error('Error deleting medication:', error);
      }
    }
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Medication Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Add Medication</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search medications..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentMedications.map((medication) => (
                <tr key={medication.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{medication.name}</div>
                      <div className="text-sm text-gray-500">{medication.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medication.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${medication.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medication.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medication.expiry_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setEditMedication(medication);
                          setShowEditModal(true);
                        }}
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteMedication(medication.id!)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Medication</h3>
            <form onSubmit={handleAddMedication} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newMedication.category}
                  onChange={(e) => setNewMedication({ ...newMedication, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  value={newMedication.price}
                  onChange={(e) => setNewMedication({ ...newMedication, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={newMedication.quantity}
                  onChange={(e) => setNewMedication({ ...newMedication, quantity: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={newMedication.expiry_date}
                  onChange={(e) => setNewMedication({ ...newMedication, expiry_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Medication Modal */}
      {showEditModal && editMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Medication</h3>
            <form onSubmit={handleEditMedication} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editMedication.name}
                  onChange={(e) => setEditMedication({ ...editMedication, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={editMedication.category}
                  onChange={(e) => setEditMedication({ ...editMedication, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  value={editMedication.price}
                  onChange={(e) => setEditMedication({ ...editMedication, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={editMedication.quantity}
                  onChange={(e) => setEditMedication({ ...editMedication, quantity: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={editMedication.expiry_date}
                  onChange={(e) => setEditMedication({ ...editMedication, expiry_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}