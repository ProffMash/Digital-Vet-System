import { useState, JSX } from 'react';
import {Clock,LogOut,Menu,Pill,User,X,MessageSquare,CreditCard,Search,Stethoscope,Syringe,Scissors,Heart,Dog } from 'lucide-react';

interface DashboardProps {
    onLogout: () => void;
}

interface Service {
    id: number;
    name: string;
    price: number;
    description: string;
    icon: JSX.Element;
    duration: string;
}

interface Medication {
    id: number;
    name: string;
    price: number;
    description: string;
    dosage: string;
    status: string;
}

export default function Dashboard({ onLogout }: DashboardProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);

    const services: Service[] = [
        {
            id: 1,
            name: "Wellness Examination",
            price: 75.00,
            description: "Comprehensive health check-up including vital signs, physical examination, and preventive care recommendations.",
            icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
            duration: "30 minutes"
        },
        {
            id: 2,
            name: "Vaccination",
            price: 45.00,
            description: "Essential immunizations to protect your pet from common diseases.",
            icon: <Syringe className="w-8 h-8 text-blue-600" />,
            duration: "15 minutes"
        },
        {
            id: 3,
            name: "Surgery",
            price: 350.00,
            description: "Professional surgical procedures including spaying/neutering and other operations.",
            icon: <Scissors className="w-8 h-8 text-blue-600" />,
            duration: "1-2 hours"
        },
        {
            id: 4,
            name: "Dental Cleaning",
            price: 200.00,
            description: "Complete dental cleaning, scaling, and oral health assessment.",
            icon: <Heart className="w-8 h-8 text-blue-600" />,
            duration: "1 hour"
        },
        {
            id: 5,
            name: "Grooming",
            price: 60.00,
            description: "Professional grooming services including bath, trim, and nail care.",
            icon: <Dog className="w-8 h-8 text-blue-600" />,
            duration: "1 hour"
        }
    ];

    const medications = [
        { id: 1, name: 'Heartgard Plus', price: 45.99, description: 'Monthly heartworm prevention', dosage: '1 tablet monthly', status: 'Available' },
        { id: 2, name: 'Frontline Plus', price: 38.99, description: 'Flea and tick prevention', dosage: 'Monthly application', status: 'Available' },
        { id: 3, name: 'Rimadyl', price: 52.99, description: 'Pain relief medication', dosage: '1 tablet twice daily', status: 'Prescription Required' },
        { id: 4, name: 'Apoquel', price: 65.99, description: 'Allergy relief medication', dosage: '1 tablet daily', status: 'Prescription Required' },
        { id: 5, name: 'Dewormer', price: 25.99, description: 'Intestinal parasite treatment', dosage: 'As directed', status: 'Available' }
    ];

    const handleMedicationPurchase = (medication: Medication) => {
        setSelectedMedication(medication);
        setShowPaymentModal(true);
    };

    const handlePayment = () => {
        alert('Payment processed successfully!');
        setShowPaymentModal(false);
        setSelectedMedication(null);
    };

    const handleBookService = () => {
        document.dispatchEvent(new CustomEvent('openAppointmentModal'));
    };

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
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
                        <a href="#services" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
                            <Stethoscope className="w-5 h-5" />
                            <span>Services</span>
                        </a>
                        <a href="#medications" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
                            <Pill className="w-5 h-5" />
                            <span>Medications</span>
                        </a>
                        <a href="#support" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
                            <MessageSquare className="w-5 h-5" />
                            <span>Contact Support</span>
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
                    {/* Clinic Info */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Clinic Hours</h3>
                            <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-gray-600">Mon-Fri: 8am - 6pm</p>
                        <p className="text-gray-600">Sat: 9am - 4pm</p>
                        <p className="text-gray-600">Sun: Closed (Emergency Only)</p>
                        <p className="text-gray-600 font-semibold mt-2">Emergency: 24/7</p>
                    </div>

                    {/* Services */}
                    <section id="services">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        {service.icon}
                                        <span className="text-lg font-bold text-blue-600">${service.price}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <p className="text-sm text-gray-500 mb-4">Duration: {service.duration}</p>
                                    <button
                                        onClick={handleBookService}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Book Appointment
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Medications */}
                    <section id="medications">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Available Medications</h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search medications..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {medications.map((medication) => (
                                <div key={medication.id} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{medication.name}</h3>
                                            <p className="text-gray-600">{medication.description}</p>
                                        </div>
                                        <span className="text-lg font-bold text-blue-600">${medication.price}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">Dosage: {medication.dosage}</p>
                                    <button
                                        onClick={() => handleMedicationPurchase(medication)}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
                                        disabled={medication.status === 'Prescription Required'}
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        <span>{medication.status === 'Prescription Required' ? 'Prescription Required' : 'Purchase'}</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Support Section */}
                    <section id="support" className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-600">Emergency: (555) 911-PETS</p>
                                    <p className="text-gray-600">General: (555) 123-4567</p>
                                    <p className="text-gray-600">Email: support@pawcare.com</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Support</h3>
                                <button
                                    onClick={() => setShowNewTicketModal(true)}
                                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedMedication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Purchase Medication</h2>
                            <button onClick={() => setShowPaymentModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-4 mb-6">
                            <div>
                                <h3 className="font-semibold text-gray-900">{selectedMedication.name}</h3>
                                <p className="text-gray-600">{selectedMedication.description}</p>
                                <p className="text-xl font-bold text-blue-600 mt-2">${selectedMedication.price}</p>
                            </div>
                            <div className="border-t pt-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Payment Details</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="1234 5678 9012 3456" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="MM/YY" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="123" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handlePayment}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Pay ${selectedMedication.price}
                        </button>
                    </div>
                </div>
            )}

            {/* Support Modal */}
            {showNewTicketModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Contact Support</h2>
                            <button onClick={() => setShowNewTicketModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            alert('Message sent! Our team will contact you soon.');
                            setShowNewTicketModal(false);
                        }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}