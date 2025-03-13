import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Syringe, Microscope, Scissors, Heart, Dog, Clock } from 'lucide-react';
import { AppointmentModal } from './components/appointment';
import ContactSection from './services/contacts';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const services = [
    {
      icon: <Stethoscope className="w-12 h-12 text-blue-600" />,
      title: "Wellness Examinations",
      description: "Comprehensive health check-ups to ensure your pet's optimal health and early detection of potential issues."
    },
    {
      icon: <Syringe className="w-12 h-12 text-blue-600" />,
      title: "Vaccinations",
      description: "Essential immunizations and preventive care to protect your pets from common diseases."
    },
    {
      icon: <Microscope className="w-12 h-12 text-blue-600" />,
      title: "Laboratory Services",
      description: "Advanced diagnostic testing including blood work, urinalysis, and pathology services."
    },
    {
      icon: <Scissors className="w-12 h-12 text-blue-600" />,
      title: "Surgery",
      description: "State-of-the-art surgical procedures, from routine spaying/neutering to complex operations."
    },
    {
      icon: <Heart className="w-12 h-12 text-blue-600" />,
      title: "Emergency Care",
      description: "24/7 emergency veterinary services for urgent medical situations."
    },
    {
      icon: <Dog className="w-12 h-12 text-blue-600" />,
      title: "Dental Care",
      description: "Complete dental services including cleaning, extractions, and oral health maintenance."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Dog className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">PawCare Vet</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-600 hover:text-blue-600">Home</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600">Services</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="text-gray-600 hover:text-blue-600"
              >
                Appointment
              </button>
              <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
              {/* Login button removed from Auth component and added here */}
              <button
                onClick={() => {
                  document.dispatchEvent(new CustomEvent('openAuthModal'));
                  navigate("/auth");
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Home</a>
              <a href="#services" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Services</a>
              <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-blue-600">About</a>
              <button
                onClick={() => {
                  setIsAppointmentModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
              >
                Appointment
              </button>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Contact</a>
              <button
                onClick={() => {
                  document.dispatchEvent(new CustomEvent('openAuthModal'));
                  navigate("/auth");
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {/* Hero Section */}
      <section id="home" className="pt-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Caring for Your Pets Like Family
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Professional veterinary care with a gentle touch. Your pet's health and happiness is our top priority.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Book an Appointment
                </button>
              </div>
            </div>
            <div className="relative h-[400px]">
              <img
                src="https://i.pinimg.com/736x/b9/a8/f6/b9a8f64c7032cc3246ae046269ca8116.jpg"
                alt="Veterinarian with dog"
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of veterinary services to keep your pets healthy and happy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Veterinary team"
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About PawCare Vet</h2>
              <p className="text-gray-600 mb-6">
                With over 20 years of experience, our team of dedicated veterinarians and staff are committed to providing
                the highest quality medical care for your beloved pets. We understand that your pets are family members,
                and we treat them with the same care and attention we would give to our own.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <Heart className="w-6 h-6 text-blue-600 mr-2" />
                  Passionate and experienced veterinary team
                </li>
                <li className="flex items-center text-gray-600">
                  <Microscope className="w-6 h-6 text-blue-600 mr-2" />
                  State-of-the-art medical equipment
                </li>
                <li className="flex items-center text-gray-600">
                  <Clock className="w-6 h-6 text-blue-600 mr-2" />
                  24/7 emergency services available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <ContactSection />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Dog className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">PawCare Vet</span>
              </div>
              <p className="text-gray-400">
                Providing exceptional veterinary care with compassion and expertise.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Wellness Examinations</li>
                <li className="text-gray-400">Vaccinations</li>
                <li className="text-gray-400">Surgery</li>
                <li className="text-gray-400">Emergency Care</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Monday - Friday: 8am - 6pm</li>
                <li className="text-gray-400">Saturday: 9am - 4pm</li>
                <li className="text-gray-400">Sunday: Closed</li>
                <li className="text-gray-400">Emergency: 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PawCare Vet. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </div>
  );
}

export default LandingPage;