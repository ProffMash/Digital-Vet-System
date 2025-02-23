import React, { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  duration: string;
  status: string;
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Wellness Examination",
      price: 75.00,
      description: "Comprehensive health check-up including vital signs, physical examination, and preventive care recommendations.",
      duration: "30 minutes",
      status: "Available"
    },
    {
      id: 2,
      name: "Vaccination",
      price: 45.00,
      description: "Essential immunizations to protect your pet from common diseases.",
      duration: "15 minutes",
      status: "Available"
    },
    {
      id: 3,
      name: "Surgery",
      price: 350.00,
      description: "Professional surgical procedures including spaying/neutering and other operations.",
      duration: "1-2 hours",
      status: "Available"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    price: 0,
    description: '',
    duration: '',
    status: 'Available'
  });

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    setServices([
      ...services,
      {
        id: services.length + 1,
        ...newService
      }
    ]);
    setShowAddModal(false);
    setNewService({
      name: '',
      price: 0,
      description: '',
      duration: '',
      status: 'Available'
    });
  };

  const handleDeleteService = (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Service Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteService(service.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Duration: {service.duration}</span>
              <span className="font-semibold text-blue-600">${service.price}</span>
            </div>
            <div className="mt-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                service.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {service.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Service</h3>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  placeholder="e.g., 30 minutes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newService.status}
                  onChange={(e) => setNewService({ ...newService, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
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
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}