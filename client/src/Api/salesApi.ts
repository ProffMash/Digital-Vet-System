import axios from "axios";
import { getMedicines } from "./medsalesApi";

const BASE_URL = "https://digital-vet-backend.onrender.com/api/sales/";

export interface Sale {
  medicine_name: any;
  id?: number;
  medicine: number;
  quantity_sold: number;
  total_price: number;
  sale_date: string;
}

// Fetch all sales
export const getSales = async (): Promise<Sale[]> => {
  try {
    const response = await axios.get<Sale[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales:", error);
    throw error;
  }
};

// Fetch a single sale by ID
export const getSaleById = async (id: number): Promise<Sale> => {
  try {
    const response = await axios.get<Sale>(`${BASE_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sale:", error);
    throw error;
  }
};

export const createSale = async (sale: Sale) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sale),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create sale");
      }
  
      const data = await response.json();
  
      // Re-fetch the updated medicines list after a sale
      await getMedicines();
  
      return data;
    } catch (error) {
      console.error("Error creating sale:", error);
      throw error;
    }
  };
  

// Update an existing sale
export const updateSale = async (id: number, sale: Sale): Promise<Sale> => {
  try {
    const response = await axios.put<Sale>(`${BASE_URL}${id}/`, sale);
    return response.data;
  } catch (error) {
    console.error("Error updating sale:", error);
    throw error;
  }
};

// Delete a sale by ID
export const deleteSale = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${id}/`);
  } catch (error) {
    console.error("Error deleting sale:", error);
    throw error;
  }
};

// Get total sales count
export const getSalesCount = async (): Promise<{ total_sales: number }> => {
  try {
    const response = await axios.get<{ total_sales: number }>(`${BASE_URL}count/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales count:", error);
    throw error;
  }
};

// Get total revenue
export const getTotalRevenue = async (): Promise<{ total_revenue: number }> => {
  try {
    const response = await axios.get<{ total_revenue: number }>(`${BASE_URL}total-revenue/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    throw error;
  }
};
