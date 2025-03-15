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
import { registerUser } from "../services/UserService";
const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const navigate = useNavigate();

  const handleCheckboxChange = (event) => setIsChecked(event.target.checked);

  const handleSignup = () => {
    if (password !== passwordAgain) {
      setPasswordError("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
      return;
    }

    setPasswordError(""); // Clear error
    registerUser(fullName, address, phoneNumber, email, password, "EMPLOYEE")
      .then(() => {
        setSnackbarType("success");
        setSnackbarMessage("Đăng ký thành công! Chào mừng bạn.");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/DangNhap"), 2000);
      })
      .catch(() => {
        setSnackbarType("error");
        setSnackbarMessage("Đăng ký thất bại. Vui lòng thử lại.");
        setOpenSnackbar(true);
      });
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
    <Box sx={{ mb: 2, width: "47%" }}>
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
    <Box sx={{ textAlign: "center", marginTop: 5 }}>
      <Typography variant="h4">ĐĂNG KÝ TÀI KHOẢN</Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
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

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="primary"
          />
          <Typography sx={{ fontSize: 14 }}>
            Tôi đồng ý với điều khoản sử dụng
          </Typography>
        </Box>
        <Button
          disabled={!isChecked}
          onClick={handleSignup}
          sx={{
            backgroundColor: isChecked ? "#33CCFF" : "#CCCCCC",
            color: "white",
            borderRadius: 15,
            fontWeight: "bold",
            mb: 5,
            width: 160,
          }}
        >
          Đăng ký
        </Button>
      </Box>

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
  );
};

export default SignUp;
