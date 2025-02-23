import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/appointments/';

export interface Appointment {
    id?: number;
    owner_name: string;
    owner_contact: string;
    date: string; // Format: 'YYYY-MM-DD'
    time: string; // Format: 'HH:MM:SS'
}

export const getAppointments = async (): Promise<Appointment[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getAppointment = async (id: number): Promise<Appointment> => {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
};

export const createAppointment = async (appointment: Appointment): Promise<Appointment> => {
    const response = await axios.post(API_URL, appointment);
    return response.data;
};

export const updateAppointment = async (id: number, appointment: Appointment): Promise<Appointment> => {
    const response = await axios.put(`${API_URL}${id}/`, appointment);
    return response.data;
};

export const deleteAppointment = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}${id}/`);
};