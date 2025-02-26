import React, { useEffect, useState } from 'react';
import { getAnimals, createAnimal, updateAnimal, deleteAnimal, Animal } from '../Api/patientApi'; // Adjust the import path as needed
import { Toaster, toast } from 'sonner';
import { Trash2, Edit3, X } from 'lucide-react';

const PatientsManagement: React.FC = () => {
  const [patients, setPatients] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Animal>({
    owner_name: '',
    owner_contact: '',
    species: '',
    status: 'admitted',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getAnimals();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAnimal(id);
      setPatients(patients.filter((patient) => patient.animal_id !== id));
      toast.success('Patient record deleted successfully');
    } catch (error) {
      console.error('Error deleting patient record:', error);
      toast.error('Failed to delete patient record');
    }
  };

  const handleEdit = (patient: Animal) => {
    setCurrentPatient(patient);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentPatient({
      owner_name: '',
      owner_contact: '',
      species: '',
      status: 'admitted',
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPatient) {
      try {
        if (isEditMode) {
          await updateAnimal(currentPatient.animal_id!, currentPatient);
          toast.success('Patient record updated successfully');
        } else {
          await createAnimal(currentPatient);
          toast.success('Patient record created successfully');
        }
        fetchPatients();
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error saving patient record:', error);
        toast.error('Failed to save patient record');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCurrentPatient({
      ...currentPatient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.owner_contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  return (
    <div className="space-y-6">
      <Toaster position="top-center" richColors />
      <h2 className="text-2xl font-bold text-gray-900">Patients Management</h2>
      <div className="flex justify-between items-center">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Patient
        </button>
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : currentPatients.length > 0 ? (
                currentPatients.map((patient) => (
                  <tr key={patient.animal_id}>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.owner_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.owner_contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.species}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(patient)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Edit3 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(patient.animal_id!)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{isEditMode ? 'Edit Patient' : 'Add Patient'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Owner Name</label>
                <input
                  type="text"
                  name="owner_name"
                  value={currentPatient.owner_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Owner Contact</label>
                <input
                  type="tel"
                  name="owner_contact"
                  value={currentPatient.owner_contact}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Species</label>
                <input
                  type="text"
                  name="species"
                  value={currentPatient.species}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={currentPatient.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="admitted">Admitted</option>
                  <option value="discharged">Discharged</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                {isEditMode ? 'Update Patient' : 'Add Patient'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsManagement;