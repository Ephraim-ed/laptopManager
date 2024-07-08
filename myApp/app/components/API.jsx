import axios from 'axios';

const API_URL = 'https://localhost:7042/api/LaptopInfo';  

export const fetchLaptop = async () => {
    try {
        const response = await axios.get(API_URL);

        return response.data;
    } catch (error) {
        console.error('Error fetching laptop:', error);
        throw error;
    }
};

export const createLaptop = async (newLaptop) => {
    try {
        const response = await axios.post(API_URL, newLaptop);
        console.log(JSON.stringify(response.data))
        return response.data;
    } catch (error) {
        console.error('Error adding laptop:', error);
        throw error;
    }
};

export const deleteLaptop = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting laptop:', error);
        throw error;
    }
};

export const updateLaptop = async (id, updatedLaptop) => {
    try {
        await axios.put(`${API_URL}/${id}`, updatedLaptop);
    } catch (error) {
        console.error('Error updating laptop:', error);
        throw error;
    }
};