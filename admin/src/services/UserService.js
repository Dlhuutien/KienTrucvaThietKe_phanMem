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


export const checkEmailUnique = async (email) => {
  try {
    await axios.get(`http://localhost:8000/userProfiles/email/${encodeURIComponent(email)}`);
    // Nếu gọi được => email đã tồn tại => ném lỗi thủ công để bên ngoài bắt
    const error = new Error("Email đã tồn tại.");
    error.response = { status: 400 };
    throw error;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Email chưa tồn tại => hợp lệ
      return;
    }
    throw error; 
  }
};

// === 2. Tạo user profile bên USER-SERVICE ===
export const updateUserProfileByEmail = async (email, profile, token) => {
  try {
    const response = await axios.put(
      `${USER_PROFILE_API}/email/${email}`,
      profile,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

    const {
      token,
      username: userNameResp,
      email,
      roles,
    } = response.data.response;

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
const USERS_API = "http://localhost:8000/users";

export const listUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const [profileRes, userRes] = await Promise.all([
      axios.get(USER_PROFILE_API, headers),
      axios.get(USERS_API, headers),
    ]);

    const profiles = profileRes.data.data || [];
    const users = userRes.data.data || [];

    const mergedCustomers = profiles
      .map(profile => {
        const matchedUser = users.find(user => user.email === profile.email);
        if (matchedUser && matchedUser.roles.some(role => role.authority === "ROLE_USER")) {
          return {
            ...profile,
            roles: matchedUser.roles,
          };
        }
        return null;
      })
      .filter(profile => profile !== null);

    return mergedCustomers;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error);
    throw error;
  }
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
