import { JSX } from 'react';

export interface Service {
    id: number;
    name: string;
    price: number;
    description: string;
    icon: JSX.Element;
    duration: string;
  }
  
  export interface Medication {
    id: number;
    name: string;
    price: number;
    description: string;
    dosage: string;
    status: string;
  }
  
  export interface PaymentModalProps {
    medication: Medication | null;
    isOpen: boolean;
    onClose: () => void;
    onPayment: () => void;
  }