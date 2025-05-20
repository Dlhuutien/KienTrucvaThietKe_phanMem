import axios from "axios";

// API Gateway base
const AUTH_API = "https://api-gateway-ow6h.onrender.com/sign-up";
const USER_PROFILE_API = "https://api-gateway-ow6h.onrender.com/userProfiles";

// === 1. Đăng ký tài khoản tại AUTH-SERVICE ===
export const registerUser = async (
  username = "",
  fullName = "",
  address = "",
  phoneNumber = "",
  email = "",
  password = "",
  roles = ["ROLE_ADMIN", "ROLE_USER"]
) => {
  const response = await axios.post(AUTH_API, {
    userName: username,
    fullName,
    address,
    phoneNumber,
    email,
    password,
    roles,
  });
  return response.data;
};

export const checkEmailUnique = async (email) => {
  try {
    await axios.get(
      `https://api-gateway-ow6h.onrender.com/userProfiles/email/${encodeURIComponent(email)}`
    );
    // Nếu gọi được => email đã tồn tại => ném lỗi thủ công để bên ngoài bắt
    const error = new Error("Email đã tồn tại.");
    error.response = { status: 400 };
    throw error;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Email chưa tồn tại => hợp lệ
      return;
    }
    throw error; // các lỗi khác (server, mạng...) vẫn throw ra
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

// ==== Nếu bên admin đăng nhập vào -> thêm role USER ===
export const addRoleToUser = async (userId, role, token) => {
  return axios.put(
    `https://api-gateway-ow6h.onrender.com/users/${userId}/add-role`,
    role, // truyền string ví dụ "ROLE_USER"
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
    }
  );
};

// === 3. Đăng nhập tài khoản ===
export const login = async (username = "", password = "") => {
  try {
    const response = await axios.post("https://api-gateway-ow6h.onrender.com/sign-in", {
      userName: username,
      password,
    });

    const {
      token,
      id,
      username: userNameResp,
      email,
      roles,
    } = response.data.response;

    localStorage.setItem("token", token);

    // Gọi API lấy profile
    const profileResponse = await axios.get(
      `${USER_PROFILE_API}/email/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { fullName, address, phoneNumber, gender, userState } =
      profileResponse.data;

    // Kiểm tra trạng thái tài khoản
    if (userState === "BANNED") {
      console.log("Tài khoản bị cấm");
      throw new Error("BANNED_ACCOUNT");
    }

    // Nếu chưa có ROLE_USER thì thêm
    const hasRoleUser = roles.some((r) => r.authority === "ROLE_USER");
    if (!hasRoleUser) {
      await addRoleToUser(id, "ROLE_USER", token);
      roles.push({ authority: "ROLE_USER" }); // cập nhật tạm trên frontend nếu chưa có role USER
    }

    // Lưu localStorage
    localStorage.setItem("userId", id);
    localStorage.setItem("loggedInUser", userNameResp);
    localStorage.setItem("email", email);
    localStorage.setItem("roles", JSON.stringify(roles));
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("address", address);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("gender", gender);
    localStorage.setItem("userState", userState);

    return response.data.response;
  } catch (error) {
    if (error.message === "BANNED_ACCOUNT") {
      console.log("Tài khoản bị cấm");
      throw error;
    }
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
