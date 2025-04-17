import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  InputBase,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../services/UserService";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Khi component được render lần đầu, kiểm tra trạng thái đăng nhập từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const storedEmail = localStorage.getItem("email");
    const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]");

    if (storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser);
      setUserRole(storedRoles.map((r) => r.authority).join(", "));
    }
  }, []);

  const handleSignUp = () => {
    navigate("/DangKy");
  };

  const handleLogin = async () => {
    try {
      const userData = await login(userName, password); // Gọi hàm login từ dịch vụ
      setUserRole(userData.roles.map((r) => r.authority).join(", "));
      setSnackbarType("success");
      setSnackbarMessage("Đăng nhập thành công");
      setOpenSnackbar(true);
      setIsLoggedIn(true);
      setUserRole(userData.role); // Cập nhật vai trò từ phản hồi của server
    } catch (error) {
      setSnackbarType("error");
      setSnackbarMessage(
        "Đăng nhập thất bại, số điện thoại hoặc mật khẩu không hợp lệ."
      );
      setOpenSnackbar(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setPassword("");
    setUserRole(null);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (isLoggedIn) {
    // Giao diện hồ sơ sau khi đăng nhập thành công
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
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Hồ sơ của bạn
        </Typography>
        <Box
          sx={{
            padding: 2,
            backgroundColor: "#F0F8FF",
            borderRadius: "10px",
            boxShadow: 3,
            width: "60%",
            textAlign: "left",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Tên người dùng: {userName}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Email: {localStorage.getItem("email")}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Vai trò: {userRole}
          </Typography>
          <Button
            sx={{
              borderRadius: 15,
              backgroundColor: "#33CCFF",
              color: "white",
              fontWeight: "bold",
              width: "100%",
            }}
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          ĐĂNG NHẬP
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "45%", mb: 3 }}>
            <InputBase
              placeholder="Vui lòng nhập tên đăng nhập"
              size="small"
              sx={{
                width: "100%",
                height: 45,
                paddingLeft: 2,
                borderRadius: 20,
                border: "1px solid #3E81FF",
              }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Box>
          <Box sx={{ width: "45%", mb: 3 }}>
            <InputBase
              placeholder="Vui lòng nhập mật khẩu"
              size="small"
              type={showPassword ? "text" : "password"}
              sx={{
                width: "100%",
                height: 45,
                paddingLeft: 2,
                paddingRight: 3,
                borderRadius: 20,
                border: "1px solid #3E81FF",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
              Chưa có tài khoản
            </Typography>
            <Button
              onClick={handleSignUp}
              sx={{
                ml: 1,
                color: "#F60000",
                fontWeight: "bold",
                fontSize: 14,
                top: -8,
              }}
            >
              Đăng ký ngay
            </Button>
          </Box>
          <Button
            sx={{
              borderRadius: 15,
              backgroundColor: "#33CCFF",
              width: 160,
              color: "white",
              fontWeight: "bold",
            }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </Box>
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

export default Login;
