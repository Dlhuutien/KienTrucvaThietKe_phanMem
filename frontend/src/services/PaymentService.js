import axios from 'axios';

const API_URL = 'https://api-gateway-ow6h.onrender.com/payment';

export const createPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${API_URL}/process`, paymentData);
        console.log("Dữ liệu trả về từ API /payment/process:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
};

export const getPaymentStatus = async (sessionId) => {
    try {
        const response = await axios.get(`${API_URL}/status?sessionId=${sessionId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching payment status:', error);
        throw error;
    }
};