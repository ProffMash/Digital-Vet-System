import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/contacts/';

export interface Contact {
    contact_id?: number;
    name: string;
    email: string;
    message: string;
}

export const getContacts = async (): Promise<Contact[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getContact = async (id: number): Promise<Contact> => {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
};

export const createContact = async (contact: Contact): Promise<Contact> => {
    const response = await axios.post(API_URL, contact);
    return response.data;
};

export const updateContact = async (id: number, contact: Contact): Promise<Contact> => {
    const response = await axios.put(`${API_URL}${id}/`, contact);
    return response.data;
};

export const deleteContact = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}${id}/`);
};