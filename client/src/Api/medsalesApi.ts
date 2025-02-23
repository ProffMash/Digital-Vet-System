import axios from 'axios';

const MEDICINE_API_URL = 'http://127.0.0.1:8000/api/medicine/';
const SALES_API_URL = 'http://127.0.0.1:8000/api/sales/';

export interface Medicine {
    id?: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
    expiry_date: string; // Format: 'YYYY-MM-DD'
}

export interface Sale {
    id?: number;
    medicine: number; // Assuming medicine is referenced by its ID
    quantity_sold: number;
    total_price?: number;
    sale_date?: string; // Format: 'YYYY-MM-DDTHH:MM:SSZ'
}

// Medicine API functions
export const getMedicines = async (): Promise<Medicine[]> => {
    const response = await axios.get(MEDICINE_API_URL);
    return response.data;
};

export const getMedicine = async (id: number): Promise<Medicine> => {
    const response = await axios.get(`${MEDICINE_API_URL}${id}/`);
    return response.data;
};

export const createMedicine = async (medicine: Medicine): Promise<Medicine> => {
    const response = await axios.post(MEDICINE_API_URL, medicine);
    return response.data;
};

export const updateMedicine = async (id: number, medicine: Medicine): Promise<Medicine> => {
    const response = await axios.put(`${MEDICINE_API_URL}${id}/`, medicine);
    return response.data;
};

export const deleteMedicine = async (id: number): Promise<void> => {
    await axios.delete(`${MEDICINE_API_URL}${id}/`);
};

// Sale API functions
export const getSales = async (): Promise<Sale[]> => {
    const response = await axios.get(SALES_API_URL);
    return response.data;
};

export const getSale = async (id: number): Promise<Sale> => {
    const response = await axios.get(`${SALES_API_URL}${id}/`);
    return response.data;
};

export const createSale = async (sale: Sale): Promise<Sale> => {
    const response = await axios.post(SALES_API_URL, sale);
    return response.data;
};

export const updateSale = async (id: number, sale: Sale): Promise<Sale> => {
    const response = await axios.put(`${SALES_API_URL}${id}/`, sale);
    return response.data;
};

export const deleteSale = async (id: number): Promise<void> => {
    await axios.delete(`${SALES_API_URL}${id}/`);
};