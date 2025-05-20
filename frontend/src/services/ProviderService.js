import axios from "axios"

const REST_API_BASE_URL = 'https://api-gateway-ow6h.onrender.com'

export const listProvider = () => {
    return axios.get(`${REST_API_BASE_URL}/providers`);
};

export const addProvider = (provider) => {
    return axios.post(`${REST_API_BASE_URL}/providers`, provider)
}

export const deleteProvider = (id) => {
    return axios.delete(`${REST_API_BASE_URL}/providers/${id}`)
}

export const updateProvider = (id, provider) => {
    return axios.put(`${REST_API_BASE_URL}/providers/${id}`, provider)
}

export const checkEmailUnique = (email, providerId) => {
    return axios.get(`${REST_API_BASE_URL}/providers/check-email?email=${email}&providerId=${providerId}`);
};
