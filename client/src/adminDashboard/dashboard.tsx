import { useState, useEffect } from 'react';
import { Users, CreditCard, Pill, MessageSquare, LogOut, Menu, X, Activity, User, Calendar, DollarSign, LifeBuoy, Package } from 'lucide-react';
import UsersManagement from './users';
import ServicesManagement from './services';
import MedicationsManagement from './medications';
import SupportTickets from './support';
import { getTotalSales, getTotalMedicines, getTotalAppointments, getTotalContacts, getTotalRevenue } from '../Api/countApi'; 
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  onLogout: () => void;
}

type ActiveSection = 'users' | 'payments' | 'medications' | 'support' | 'overview';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UsersManagement />;
      case 'payments':
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
              onClick={() => setActiveSection('payments')}
              className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors duration-200 ${
                isActive('payments')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Payments</span>
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
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSupportTickets, setTotalSupportTickets] = useState(0);
  const [totalMedicines, setTotalMedicines] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getTotalContacts();
      const appointments = await getTotalAppointments();
      const revenue = await getTotalRevenue();
      const supportTickets = await getTotalSales(); // Assuming support tickets are counted as sales
      const medicines = await getTotalMedicines();

      setTotalUsers(users);
      setTotalAppointments(appointments);
      setTotalRevenue(revenue);
      setTotalSupportTickets(supportTickets);
      setTotalMedicines(medicines);
    };

    fetchData();
  }, []);

  const stats = [
    { title: 'Total Users', value: totalUsers, change: '+12%', icon: <User className="w-5 h-5 text-gray-400" /> },
    { title: 'Active Appointments', value: totalAppointments, change: '+8%', icon: <Calendar className="w-5 h-5 text-gray-400" /> },
    { title: 'Revenue', value: `$${totalRevenue}`, change: '+23%', icon: <DollarSign className="w-5 h-5 text-gray-400" /> },
    { title: 'Support Tickets', value: totalSupportTickets, change: '-5%', icon: <LifeBuoy className="w-5 h-5 text-gray-400" /> },
    { title: 'Total Medicines', value: totalMedicines, change: '+10%', icon: <Package className="w-5 h-5 text-gray-400" /> }
  ];

  const data = [
    { name: 'Users', value: totalUsers },
    { name: 'Appointments', value: totalAppointments },
    { name: 'Support Tickets', value: totalSupportTickets },
    { name: 'Medicines', value: totalMedicines }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className="mr-2">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">{stat.title}</h3>
              <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className={`text-xs mt-1 ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}