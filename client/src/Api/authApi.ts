import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'http://127.0.0.1:8000/api';

// Define the interface for the user data
interface UserData {
    full_name: string;
    email: string;
    password: string;
}

// Define the interface for the response data
interface AuthResponse {
    token: string;
}

// Function to register a new user
export const registerUser = async (userData: UserData): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${BASE_URL}/register/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

// Function to login an existing user
export const loginUser = async (userData: Omit<UserData, 'full_name'>): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${BASE_URL}/login/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

// Example usage:
// const userData = {
//     full_name: 'Admin',
//     email: 'admin@gmail.com',
//     password: 'password'
// };

// registerUser(userData).then(response => {
//     console.log('Registration successful:', response);
// }).catch(error => {
//     console.error('Registration failed:', error);
// });

// loginUser({ email: 'admin@gmail.com', password: 'password' }).then(response => {
//     console.log('Login successful:', response);
// }).catch(error => {
//     console.error('Login failed:', error);
// });