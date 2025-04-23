import axios from "axios";

// Cập nhật đúng REST API URL
const REST_API_BASE_URL = "http://localhost:8000/api"; // sửa URL ở đây

export const listProduct = () => {
  return axios.get(`${REST_API_BASE_URL}/products`);
};

export const addProduct = (product) => {
  return axios.post(`${REST_API_BASE_URL}/products`, product);
};

export const updateProduct = (id, product) => {
  return axios.put(`${REST_API_BASE_URL}/products/${id}`, product);
};

export const deleteProduct = (id) => {
  return axios.delete(`${REST_API_BASE_URL}/products/${id}`);
};

export const getInventories = () => {
  return axios.get("http://localhost:8000/inventory");
};
