import axios from "axios"

const REST_API_BASE_URL = 'https://api-gateway-ow6h.onrender.com'

export const listPurchaseDetail = () => {
    return axios.get(`${REST_API_BASE_URL}/purchaseDetail`)
}

export const addPurchaseDetail = (purchaseDetail) => {
    return axios.post(`${REST_API_BASE_URL}/purchaseDetail`, purchaseDetail, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


export const updatePurchaseDetail = (id, purchaseDetail) => {
    return axios.put(`${REST_API_BASE_URL}/purchaseDetail/${id}`, purchaseDetail)
}

export const deletePurchaseDetail = (id) => {
    return axios.delete(`${REST_API_BASE_URL}/purchaseDetail/${id}`)
}

export const getListProductNames = () => {
    return axios.get(`${REST_API_BASE_URL}/purchaseDetail/productNames`)
}

export const getListProviderNames = () => {
    return axios.get(`${REST_API_BASE_URL}/purchaseDetail/providerNames`)
}