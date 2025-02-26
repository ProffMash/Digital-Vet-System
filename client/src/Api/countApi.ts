// import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000/api";

// export const getTotalSales = async (): Promise<number> => {
//   try {
//     const response = await axios.get<{ total_sales: number }>(`${BASE_URL}/sales/count/`);
//     return response.data.total_sales;
//   } catch (error) {
//     console.error("Error fetching total sales:", error);
//     return 0;
//   }
// };

// export const getTotalMedicines = async (): Promise<number> => {
//   try {
//     const response = await axios.get<{ total_medicines: number }>(`${BASE_URL}/medicine/count/`);
//     return response.data.total_medicines;
//   } catch (error) {
//     console.error("Error fetching total medicines:", error);
//     return 0;
//   }
// };

// export const getTotalAppointments = async (): Promise<number> => {
//   try {
//     const response = await axios.get<{ total_appointments: number }>(`${BASE_URL}/appointments/count/`);
//     return response.data.total_appointments || 0;
//   } catch (error) {
//     console.error("Error fetching total appointments:", error);
//     return 0;
//   }
// };

// export const getTotalContacts = async (): Promise<number> => {
//   try {
//     const response = await axios.get<{ total_contacts: number }>(`${BASE_URL}/contacts/count/`);
//     return response.data.total_contacts || 0;
//   } catch (error) {
//     console.error("Error fetching total contacts:", error);
//     return 0;
//   }
// };

// export const getTotalRevenue = async (): Promise<number> => {
//   try {
//     const response = await axios.get<{ total_revenue: number }>(`${BASE_URL}/sales/total-revenue/`);
//     return response.data.total_revenue;
//   } catch (error) {
//     console.error("Error fetching total revenue:", error);
//     return 0;
//   }
// };






import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const getTotalSales = async (): Promise<number> => {
  try {
    const response = await axios.get<{ total_sales: number }>(`${BASE_URL}/sales/count/`);
    return response.data.total_sales;
  } catch (error) {
    console.error("Error fetching total sales:", error);
    return 0;
  }
};

export const getTotalMedicines = async (): Promise<number> => {
  try {
    const response = await axios.get<{ total_medicines: number }>(`${BASE_URL}/medicine/count/`);
    return response.data.total_medicines;
  } catch (error) {
    console.error("Error fetching total medicines:", error);
    return 0;
  }
};

export const getTotalAppointments = async (): Promise<number> => {
  try {
    const response = await axios.get<{ total_appointments: number }>(`${BASE_URL}/appointments/count/`);
    return response.data.total_appointments || 0;
  } catch (error) {
    console.error("Error fetching total appointments:", error);
    return 0;
  }
};

export const getTotalContacts = async (): Promise<number> => {
  try {
    const response = await axios.get<{ total_contacts: number }>(`${BASE_URL}/contacts/count/`);
    return response.data.total_contacts || 0;
  } catch (error) {
    console.error("Error fetching total contacts:", error);
    return 0;
  }
};

export const getTotalRevenue = async (): Promise<number> => {
  try {
    const response = await axios.get<{ total_revenue: number }>(`${BASE_URL}/sales/total-revenue/`);
    return response.data.total_revenue;
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    return 0;
  }
};

export const getTotalPatients = async (): Promise<number> => {
  try {
    const response = await axios.get<{ total_patients: number }>(`${BASE_URL}/patients/count/`);
    return response.data.total_patients || 0;
  } catch (error) {
    console.error("Error fetching total patients:", error);
    return 0;
  }
};