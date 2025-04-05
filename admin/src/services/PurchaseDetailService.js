import axios from "axios"

const REST_API_BASE_URL = 'http://localhost:8000'

export const listPurchaseDetail = () => {
    return axios.get(`${REST_API_BASE_URL}/purchaseDetail`)
}
export const addPurchaseDetail = (purchaseDetail) => {
    return axios.post(`${REST_API_BASE_URL}/purchaseDetail`, purchaseDetail)
}

export const updatePurchaseDetail = (id, purchaseDetail) => {
    return axios.put(`${REST_API_BASE_URL}/purchaseDetail/${id}`, purchaseDetail)
}

export const deletePurchaseDetail = (id) => {
    return axios.delete(`${REST_API_BASE_URL}/purchaseDetail/${id}`)
}