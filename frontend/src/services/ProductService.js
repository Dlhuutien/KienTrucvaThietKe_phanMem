import axios from "axios";

const REST_API_BASE_URL = "http://localhost:5000/api";
const REST_API_BASE_URL2 = "http://localhost:5000";

export const listProduct = () => {
  return axios.get(`${REST_API_BASE_URL}/products`);
};

export const registerUser = async (
  fullName = "",
  address = "",
  phoneNumber = "",
  email = "",
  password = "",
  role = ""
) => {
  try {
    const respone = await axios.post(`${REST_API_BASE_URL2}/users/signup`, {
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
    const response = await axios.post(`${REST_API_BASE_URL2}/users/login`, {
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

export const listProductBySearchTerm = (searchTerm = "") => {
  return searchTerm
    ? axios.get(`${REST_API_BASE_URL}/products?searchTerm=${searchTerm}`)
    : axios.get(`${REST_API_BASE_URL}/products`);
};

export const searchProductNewest = () => {
  return axios.get(`${REST_API_BASE_URL}/products/newest`);
};

export const listPhoneByFilter = (
  ramList = "",
  romList = "",
  chipList = "",
  minPrice = "",
  maxPrice = ""
) => {
  const params = new URLSearchParams();
  if (ramList) params.append("ramList", ramList);
  if (romList) params.append("romList", romList);
  if (chipList) params.append("chipList", chipList);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);

  const url = `${REST_API_BASE_URL}/products/phone/filter`;
  return axios.get(params.toString() ? `${url}?${params.toString()}` : url);
};

export const listCableByFilter = (
  cableList = "",
  lengthList = "",
  minPrice = "",
  maxPrice = ""
) => {
  console.log(lengthList);
  const params = new URLSearchParams();
  if (cableList) params.append("cableTypeList", cableList);
  if (lengthList) params.append("lengthList", lengthList);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);

  const url = `${REST_API_BASE_URL}/products/cable/filter`;
  return axios.get(params.toString() ? `${url}?${params.toString()}` : url);
};

export const listEarPhoneByFilter = (
  brandList = "",
  connectTypeList = "",
  other = "",
  minPrice = "",
  maxPrice = ""
) => {
  const params = new URLSearchParams();
  if (connectTypeList) params.append("connectTypeList", connectTypeList);
  if (brandList) params.append("brandList", brandList);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);
  if (other) params.append("other", other);

  const url = `${REST_API_BASE_URL}/products/earphone/filter`;
  return axios.get(params.toString() ? `${url}?${params.toString()}` : url);
};

export const listPowerBankByFilter = (
  inputList = "",
  outputList = "",
  capacityList = "",
  capacity = "",
  batteryGreaterList = "",
  batteryLessList = "",
  minPrice = "",
  maxPrice = ""
) => {
  const params = new URLSearchParams();
  if (inputList) params.append("inputList", inputList);
  if (outputList) params.append("outputList", outputList);
  if (capacityList) params.append("capacityList", capacityList);
  if (capacity) params.append("capacity", capacity);
  if (batteryGreaterList)
    params.append("batteryGreaterList", batteryGreaterList);
  if (batteryLessList) params.append("batteryLessList", batteryLessList);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);
  console.log(params.toString());
  const url = `${REST_API_BASE_URL}/products/powerBank/filter`;
  return axios.get(params.toString() ? `${url}?${params.toString()}` : url);
};

export const searchProductByCategory = (category = "") => {
  return category
    ? axios.get(`${REST_API_BASE_URL}/products/category?name=${category}`)
    : axios.get(`${REST_API_BASE_URL}/products`);
};

export const searchProductSale = () => {
  return axios.get(`${REST_API_BASE_URL}/products/sale`);
};

export const searchProduct = (searchTerm) => {
  const searchQuery = `?searchTerm=${encodeURIComponent(searchTerm)}`;
  return axios.get(`http://localhost:5000/search${searchQuery}`);
};

export const getProductById = (productId) => {
  console.log(`${REST_API_BASE_URL}/products/${productId}`);
  return axios.get(`${REST_API_BASE_URL}/products/${productId}`);
};

export const processUserQuery = async (userQuery) => {
  try {
    // Sending POST request to the backend
    const response = await axios.post(
      `${REST_API_BASE_URL}/chatbox/process-query`,
      null,
      {
        params: { userQuery },
      }
    );
    const { data } = response;

    // Check if the response status is 'success'
    if (data.status === "success") {
      return data.data; // Return only the 'data' field from the response
    } else {
      return "Rất tiếc, chúng tôi không thể xử lý yêu cầu của bạn. Vui lòng thử lại!";
    }
  } catch (error) {
    // Handle network errors and other exceptions
    return "Đã có lỗi! Rất tiếc, chúng tôi không thể xử lý yêu cầu của bạn. Vui lòng thử lại!";
  }
};
