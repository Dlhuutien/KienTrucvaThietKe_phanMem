import axios from "axios";

const BASE_API_URL = "http://localhost:8000/cart";

// Thêm Cart mới (bao gồm cả danh sách cartDetails)
export const createCart = (cartDTO) => {
  return axios.post(`${BASE_API_URL}`, cartDTO);
};

// Xóa một CartDetail theo ID
export const deleteCartDetail = (cartDetailId) => {
  return axios.delete(`${BASE_API_URL}/cart-detail/${cartDetailId}`);
};

// Cập nhật quantity cho một cart detail (id là cartDetailId)
export const updateCartDetailQuantity = (cartDetailId, quantity) => {
  return axios.post(`${BASE_API_URL}/cart-detail/${cartDetailId}/update-quantity`, null, {
    params: { quantity },
  });
};

// Lấy toàn bộ giỏ hàng
export const getAllCarts = () => {
  return axios.get(`${BASE_API_URL}`);
};
