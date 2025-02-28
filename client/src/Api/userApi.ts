// Define the User interface based on the sample data
interface User {
    id: number;
    full_name: string;
    email: string;
}

// Base URL for the API
const BASE_URL = 'http://127.0.0.1:8000/api/users';
const Base_URL = 'http://127.0.0.1:8000/api/register/'

// Function to fetch all users
export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Function to fetch a single user by ID
export const fetchUserById = async (id: number): Promise<User> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error;
    }
};

// Function to create a new user
export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    try {
        const response = await fetch(Base_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Function to update an existing user
export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User = await response.json();
        return data;
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw error;
    }
};

// Function to delete a user by ID
export const deleteUser = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}/`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw error;
    }
};