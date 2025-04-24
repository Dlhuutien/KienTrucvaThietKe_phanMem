import axios from "axios";

// API Gateway base
const AUTH_API = "http://localhost:8000/sign-up";
const USER_PROFILE_API = "http://localhost:8000/userProfiles";

// === 1. Đăng ký tài khoản tại AUTH-SERVICE ===
export const registerUser = async (
  username = "",
  fullName = "",
  address = "",
  phoneNumber = "",
  email = "",
  password = "",
  role = "ROLE_ADMIN"
) => {
  const response = await axios.post(AUTH_API, {
    userName: username,
    fullName,
    address,
    phoneNumber,
    email,
    password,
    roles: [role],
  });
  return response.data;
};


// === 2. Tạo user profile bên USER-SERVICE ===
export const updateUserProfileByEmail = async (email, profile, token) => {
  try {
    const response = await axios.put(`${USER_PROFILE_API}/email/${email}`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật profile bằng email:", error);
    throw error;
  }
};

// === 3. Đăng nhập tài khoản ===
export const login = async (username = "", password = "") => {
  try {
    const response = await axios.post("http://localhost:8000/sign-in", {
      userName: username,
      password,
    });

    const { token, username: userNameResp, email, roles } = response.data.response;

    // Lưu vào localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("loggedInUser", userNameResp);
    localStorage.setItem("email", email);
    localStorage.setItem("roles", JSON.stringify(roles));

    return response.data.response; // Trả token + user info để frontend dùng
  } catch (error) {
    console.log("Lỗi khi đăng nhập:", error);
    throw error;
  }
};


// === 4. Các API thao tác với USER-SERVICE ===
export const listUser = () => {
  return axios.get(USER_PROFILE_API);
};

export const updateStateUser = (id, userState) => {
  return axios.post(`${USER_PROFILE_API}/${id}/state`, { userState });
};

export const updateUser = (id, user) => {
  return axios.put(`${USER_PROFILE_API}/${id}`, user);
};

export const deleteUser = (id) => {
  return axios.delete(`${USER_PROFILE_API}/${id}`);
};

export const saveUser = (user) => {
  return axios.post(USER_PROFILE_API, user);
};
