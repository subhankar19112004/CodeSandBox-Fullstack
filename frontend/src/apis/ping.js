import axios from '../config/axiosConfig.js';

export const pingApi = async () => {
    try {
        const response = await axios.get('/api/v1/ping');
        console.log(response.data)
        return response.data; // Assuming the server returns a JSON response
    } catch (error) {
        console.error("Error pinging the server:", error);
        throw error; // Rethrow the error to handle it in the calling function
        
    }
}