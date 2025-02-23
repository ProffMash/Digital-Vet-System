import { useState } from 'react';
import {Calendar,LogOut,Menu,Settings,User,Users,X,Activity,DollarSign } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const appointments = [
    { id: 1, pet: 'Max', owner: 'John Doe', service: 'Vaccination', date: '2025-03-15', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, pet: 'Luna', owner: 'Jane Smith', service: 'Check-up', date: '2025-03-16', time: '2:30 PM', status: 'Pending' },
    { id: 3, pet: 'Bella', owner: 'Mike Johnson', service: 'Dental Cleaning', date: '2025-03-17', time: '11:15 AM', status: 'Confirmed' },
  ];

  const staff = [
    { id: 1, name: 'Dr. Sarah Wilson', role: 'Lead Veterinarian', status: 'Available' },
    { id: 2, name: 'Dr. James Brown', role: 'Veterinarian', status: 'In Surgery' },
    { id: 3, name: 'Emily Davis', role: 'Veterinary Technician', status: 'Available' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Administrator</h2>
              <p className="text-gray-600 text-sm">Dashboard</p>
            </div>
          </div>
          
          <nav className="space-y-4">
            <a href="#appointments" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </a>
            <a href="#staff" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
              <Users className="w-5 h-5" />
              <span>Staff Management</span>
            </a>
            <a href="#analytics" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
              <Activity className="w-5 h-5" />
              <span>Analytics</span>
            </a>
            <a href="#billing" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
              <DollarSign className="w-5 h-5" />
              <span>Billing</span>
            </a>
            <a href="#settings" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
            <button
              onClick={onLogout}
              className="flex items-center space-x-3 text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`lg:ml-64 p-8 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-margin duration-300 ease-in-out`}>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Quick Stats */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Appointments</h3>
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-gray-600">This month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Staff</h3>
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-gray-600">Currently working</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">$45,289</p>
              <p className="text-gray-600">This month</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Patient Satisfaction</h3>
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">94%</p>
              <p className="text-gray-600">Based on reviews</p>
            </div>
          </section>

          {/* Appointments */}
          <section id="appointments">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Appointments</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.pet}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.owner}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Staff Management */}
          <section id="staff">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Staff Status</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {staff.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.status === 'Available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}