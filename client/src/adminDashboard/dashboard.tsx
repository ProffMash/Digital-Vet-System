import { useState } from 'react';
import {Users,Stethoscope,Pill,MessageSquare,LogOut,Menu,X,Activity } from 'lucide-react';
import UsersManagement from './users';
import ServicesManagement from './services';
import MedicationsManagement from './medications';
import SupportTickets from './support';

interface AdminDashboardProps {
  onLogout: () => void;
}

type ActiveSection = 'users' | 'services' | 'medications' | 'support' | 'overview';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UsersManagement />;
      case 'services':
        return <ServicesManagement />;
      case 'medications':
        return <MedicationsManagement />;
      case 'support':
        return <SupportTickets />;
      case 'overview':
        return <Overview />;
      default:
        return <Overview />;
    }
  };

  const isActive = (section: ActiveSection) => activeSection === section;

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
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Admin Panel</h2>
              <p className="text-gray-600 text-sm">Management Dashboard</p>
            </div>
          </div>
          
          <nav className="space-y-4">
            <button
              onClick={() => setActiveSection('overview')}
              className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors duration-200 ${
                isActive('overview')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Activity className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveSection('users')}
              className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors duration-200 ${
                isActive('users')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </button>
            <button
              onClick={() => setActiveSection('services')}
              className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors duration-200 ${
                isActive('services')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Stethoscope className="w-5 h-5" />
              <span>Services</span>
            </button>
            <button
              onClick={() => setActiveSection('medications')}
              className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors duration-200 ${
                isActive('medications')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Pill className="w-5 h-5" />
              <span>Medications</span>
            </button>
            <button
              onClick={() => setActiveSection('support')}
              className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors duration-200 ${
                isActive('support')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Support Tickets</span>
            </button>
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
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function Overview() {
  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%' },
    { title: 'Active Appointments', value: '156', change: '+8%' },
    { title: 'Revenue', value: '$45,289', change: '+23%' },
    { title: 'Support Tickets', value: '48', change: '-5%' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className={`text-sm mt-2 ${
              stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}