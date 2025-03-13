import axios from "axios";

// Define the API base URL
const API_BASE_URL = "https://digital-vet-backend.onrender.com/api/patients";

// Define the Animal interface
export interface Animal {
  animal_id?: number;
  owner_name: string;
  owner_contact: string;
  species: string;
  status: "admitted" | "discharged";
}

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all animals
export const getAnimals = async (): Promise<Animal[]> => {
  const response = await api.get("/");
  return response.data;
};

// Fetch a single animal by ID
export const getAnimalById = async (id: number): Promise<Animal> => {
  const response = await api.get(`/${id}/`);
  return response.data;
};

// Create a new animal record
export const createAnimal = async (animal: Animal): Promise<Animal> => {
  const response = await api.post("/", animal);
  return response.data;
};

// Update an existing animal record
export const updateAnimal = async (id: number, animal: Animal): Promise<Animal> => {
  const response = await api.put(`/${id}/`, animal);
  return response.data;
};

// Delete an animal record
export const deleteAnimal = async (id: number): Promise<void> => {
  await api.delete(`/${id}/`);
};