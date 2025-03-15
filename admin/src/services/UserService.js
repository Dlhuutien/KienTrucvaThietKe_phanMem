import axios from "axios";

const REST_API_BASE_URL = "http://localhost:5000/users";

export const registerUser = async (
  fullName = "",
  address = "",
  phoneNumber = "",
  email = "",
  password = "",
  role = ""
) => {
  try {
    const respone = await axios.post(`${REST_API_BASE_URL}/signup`, {
      fullName,
      address,
      phoneNumber,
      email,
      password,
      role,
    });
    return respone.data;
  } catch (error) {
    console.log("Error registering user:", error);
    throw error;
  }
};

export const login = async (userName = "", password = "") => {
    try {
      const response = await axios.post(`${REST_API_BASE_URL}/login`, {
        userName,
        password,
      });
      console.log("Login successful, user data:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error registering user:", error);
      throw error;
    }
};

export const listUser = () => {
  return axios.get(REST_API_BASE_URL);
};

export const updateStateUser = (id) => {
  return axios.put(`${REST_API_BASE_URL}/${id}/state`);
};

export const updateUser = (id, user) => {
  return axios.put(`${REST_API_BASE_URL}/${id}`, user);
};

export const deteteUser = (id) => {
  return axios.delete(`${REST_API_BASE_URL}/${id}`);
};

export const saveUser = (user) => {
  return axios.post(`${REST_API_BASE_URL}`, user);
};
