import { useState } from 'react';
import { Stethoscope, Syringe, Scissors, Heart, Dog } from 'lucide-react';
import { Service } from './types';
import AppointmentModal from './appointments';

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

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
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
              onClick={() => handleBookService(service)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedService(undefined);
        }}
        service={selectedService}
      />
    </section>
  );
}