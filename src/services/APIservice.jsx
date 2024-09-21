import axios from 'axios';

const BASE_URL = 'http://localhost:8081';
const REGISTER_URL = `${BASE_URL}/api/users/register`;

export const registerUser = async (userData) => {
    console.log("userData:: apiservice",userData)
    try {
            const response =  axios.post(REGISTER_URL, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        
        const data = await response;
        return data;
    } catch (error) {
        throw error;
    }
};
