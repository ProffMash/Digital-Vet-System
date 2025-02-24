
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/medicine/";

export interface Medicine {
  id?: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  expiry_date: string;
}

// Fetch all medicines
export const getMedicines = async (): Promise<Medicine[]> => {
  try {
    const response = await axios.get<Medicine[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching medicines:", error);
    throw error;
  }
};

// Fetch a single medicine by ID
export const getMedicineById = async (id: number): Promise<Medicine> => {
  try {
    const response = await axios.get<Medicine>(`${BASE_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching medicine:", error);
    throw error;
  }
};

// Create a new medicine
export const createMedicine = async (medicine: Medicine): Promise<Medicine> => {
  try {
    const response = await axios.post<Medicine>(BASE_URL, medicine);
    return response.data;
  } catch (error) {
    console.error("Error creating medicine:", error);
    throw error;
  }
};

// Update an existing medicine
export const updateMedicine = async (id: number, medicine: Medicine): Promise<Medicine> => {
  try {
    const response = await axios.put<Medicine>(`${BASE_URL}${id}/`, medicine);
    return response.data;
  } catch (error) {
    console.error("Error updating medicine:", error);
    throw error;
  }
};

// Delete a medicine by ID
export const deleteMedicine = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${id}/`);
  } catch (error) {
    console.error("Error deleting medicine:", error);
    throw error;
  }
};

// Get total medicine count
export const getMedicineCount = async (): Promise<{ total_medicines: number }> => {
  try {
    const response = await axios.get<{ total_medicines: number }>(`${BASE_URL}count/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching medicine count:", error);
    throw error;
  }
};

// Get medicines with low stock
export const getLowStockMedicines = async (): Promise<Medicine[]> => {
  try {
    const response = await axios.get<Medicine[]>(`${BASE_URL}low-stock/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching low stock medicines:", error);
    throw error;
  }
};

// Get total stock value
export const getTotalStockValue = async (): Promise<{ total_stock_value: number }> => {
  try {
    const response = await axios.get<{ total_stock_value: number }>(`${BASE_URL}total-stock-value/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total stock value:", error);
    throw error;
  }
};
