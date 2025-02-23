import { useState } from 'react';
import { Clock,LogOut,Menu,Pill,User,X,MessageSquare,Stethoscope } from 'lucide-react';
import Services from './services';
import Medications from './medications';
import Support from './support';

interface DashboardProps {
  onLogout: () => void;
}

type ActiveSection = 'services' | 'medications' | 'support';

export default function Dashboard({ onLogout }: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<ActiveSection>('services');

  const renderContent = () => {
    switch (activeSection) {
      case 'services':
        return <Services />;
      case 'medications':
        return <Medications />;
      case 'support':
        return <Support />;
      default:
        return <Services />;
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
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Pet Portal</h2>
              <p className="text-gray-600 text-sm">Services</p>
            </div>
          </div>
          
          <nav className="space-y-4">
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
              <span>Contact Support</span>
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
          {/* Clinic Info - Always visible */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Clinic Hours</h3>
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600">Mon-Fri: 8am - 6pm</p>
            <p className="text-gray-600">Sat: 9am - 4pm</p>
            <p className="text-gray-600">Sun: Closed (Emergency Only)</p>
            <p className="text-gray-600 font-semibold mt-2">Emergency: 24/7</p>
          </div>

          {/* Conditional Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}