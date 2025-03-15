import axios from "axios"

const REST_API_BASE_URL = 'http://localhost:5000/api'

export const listProduct = () => {
    return axios.get(`${REST_API_BASE_URL}/products`)
}

export const addProduct = (product) => {
    return axios.post(`${REST_API_BASE_URL}/products`, product)
}

export const updateProduct = (id, product) => {
    return axios.put(`${REST_API_BASE_URL}/products/${id}`, product)
}

export const deleteProduct = (id) => {
    return axios.delete(`${REST_API_BASE_URL}/products/${id}`)
}


