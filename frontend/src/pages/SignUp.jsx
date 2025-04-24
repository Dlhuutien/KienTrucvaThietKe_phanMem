import {
  Box,
  Button,
  Checkbox,
  InputBase,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  registerUser,
  createUserProfile,
  login,
  updateUserProfileByEmail
} from "../services/UserService";

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("MALE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const navigate = useNavigate();

  const handleCheckboxChange = (event) => setIsChecked(event.target.checked);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== passwordAgain) {
      setPasswordError("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
      return;
    }

    setPasswordError("");
    setIsLoading(true);

    try {
      // 1. Đăng ký tài khoản (auth-service)
      await registerUser(
        username,
        fullName,
        address,
        phoneNumber,
        email,
        password,
        "ROLE_ADMIN"
      );

      // 2. Đăng nhập để lấy token
      const loginResponse = await login(username, password);
      const token = loginResponse.token;

      if (!token) throw new Error("Không lấy được token sau khi đăng nhập!");

      // 3. Tạo user profile
      const userProfile = {
        fullName,
        address,
        phoneNumber,
        email,
        userState: "ACTIVE",
        gender,
      };

      await updateUserProfileByEmail(email, userProfile, token);

      // 4. Thành công
      setSnackbarType("success");
      setSnackbarMessage("Đăng ký thành công! Chào mừng bạn.");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.log("Lỗi đăng ký:", error);
      setSnackbarType("error");
      setSnackbarMessage("Đăng ký thất bại. Vui lòng thử lại.");
      setOpenSnackbar(true);
    }
  };

  const renderInputField = (
    label,
    placeholder,
    type,
    value,
    setValue,
    showPasswordState,
    setShowPasswordState,
    errorMessage
  ) => (
    <Box sx={{ m: 2, width: "90%", textAlign: "center", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography>{label}</Typography>
        <Typography sx={{ ml: 1, color: "#F60000" }}>*</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          border: "1px solid black",
          pl: 2,
          borderRadius: 20,
          borderColor: errorMessage ? "#F60000" : "#3E81FF",
        }}
      >
        <InputBase
          autoComplete="new-password"
          placeholder={placeholder}
          type={type === "password" && !showPasswordState ? "password" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ width: "100%", height: 35 }}
          endAdornment={
            type === "password" && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPasswordState(!showPasswordState)}
                >
                  {showPasswordState ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </Box>
      {errorMessage && (
        <Typography sx={{ color: "#F60000", fontSize: 12, mt: 1 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        bgcolor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          padding: 2,
          // backgroundColor: "#F0F8FF",
          borderRadius: "10px",
          boxShadow: 3,
          width: "60%",
          textAlign: "left",
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          ĐĂNG KÝ TÀI KHOẢN
        </Typography>

        <form onSubmit={handleSignup}>
          {renderInputField(
            "Tên đăng nhập",
            "Vui lòng nhập tên đăng nhập",
            "text",
            username,
            setUsername
          )}
          {renderInputField(
            "Họ và tên",
            "Vui lòng nhập họ và tên",
            "text",
            fullName,
            setFullName
          )}
          {renderInputField(
            "Địa chỉ",
            "Vui lòng nhập địa chỉ",
            "text",
            address,
            setAddress
          )}
          {renderInputField(
            "Số điện thoại",
            "Vui lòng nhập số điện thoại",
            "text",
            phoneNumber,
            setPhoneNumber
          )}
          {renderInputField(
            "Email",
            "Vui lòng nhập email",
            "text",
            email,
            setEmail
          )}
          {renderInputField(
            "Mật khẩu",
            "Vui lòng nhập mật khẩu",
            "password",
            password,
            setPassword,
            showPassword,
            setShowPassword
          )}
          {renderInputField(
            "Nhập lại mật khẩu",
            "Vui lòng nhập lại mật khẩu",
            "password",
            passwordAgain,
            setPasswordAgain,
            showPasswordAgain,
            setShowPasswordAgain,
            passwordError
          )}

          <Box sx={{ mb: 2, m: 3 }}>
            <Typography sx={{ mb: 1 }}>Giới tính</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <label>
                <input
                  type="radio"
                  value="MALE"
                  name="gender"
                  checked={gender === "MALE"}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                Nam
              </label>
              <label>
                <input
                  type="radio"
                  value="FEMALE"
                  name="gender"
                  checked={gender === "FEMALE"}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                Nữ
              </label>
              <label>
                <input
                  type="radio"
                  value="OTHER"
                  name="gender"
                  checked={gender === "OTHER"}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                Khác
              </label>
            </Box>
          </Box>

          {/* 👇 Checkbox điều khoản */}
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            <Typography sx={{ fontSize: 14 }}>
              Tôi đồng ý với điều khoản sử dụng
            </Typography>
          </Box>

          {/* 👇 Nút Đăng ký */}
          <Button
            type="submit"
            fullWidth
            disabled={!isChecked || isLoading}
            sx={{
              backgroundColor: isChecked ? "#33CCFF" : "#CCCCCC",
              color: "white",
              borderRadius: 3,
              fontWeight: "bold",
              height: 45,
              mb: 2,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Đăng ký"
            )}
          </Button>
        </form>

        {/* 👇 Thông báo SnackBar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarType}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default SignUp;
