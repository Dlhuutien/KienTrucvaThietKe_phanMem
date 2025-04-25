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
  login,
  updateUserProfileByEmail,
  checkEmailUnique,
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

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const navigate = useNavigate();

  const validate = (fieldName) => {
    let tempErrors = { ...errors };

    if (!fieldName || fieldName === "username") {
      if (!username.trim())
        tempErrors.username = "Tên đăng nhập không được để trống.";
      else delete tempErrors.username;
    }

    if (!fieldName || fieldName === "fullName") {
      if (!fullName.trim()) tempErrors.fullName = "Họ tên không được để trống.";
      else delete tempErrors.fullName;
    }

    if (!fieldName || fieldName === "address") {
      if (!address.trim()) tempErrors.address = "Địa chỉ không được để trống.";
      else delete tempErrors.address;
    }

    if (!fieldName || fieldName === "phoneNumber") {
      if (!phoneNumber.trim())
        tempErrors.phoneNumber = "Số điện thoại không được để trống.";
      else delete tempErrors.phoneNumber;
    }

    if (!fieldName || fieldName === "email") {
      if (!email.trim()) tempErrors.email = "Email không được để trống.";
      else if (!/\S+@\S+\.\S+/.test(email))
        tempErrors.email = "Email không hợp lệ.";
      else delete tempErrors.email;
    }

    if (!fieldName || fieldName === "password") {
      if (!password.trim()) {
        tempErrors.password = "Mật khẩu không được để trống.";
      } else if (password.length < 8 || password.length > 16) {
        tempErrors.password = "Mật khẩu phải từ 8 đến 16 ký tự.";
      } else {
        delete tempErrors.password;
      }
    }    

    if (!fieldName || fieldName === "passwordAgain") {
      if (password !== passwordAgain)
        tempErrors.passwordAgain = "Mật khẩu không khớp.";
      else delete tempErrors.passwordAgain;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleBlur = async (e) => {
    const { name } = e.target;
    validate(name);

    if (name === "email" && email.trim()) {
      try {
        await checkEmailUnique(email);
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors((prev) => ({
            ...prev,
            email: "Email này đã tồn tại.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            email: "Lỗi kiểm tra email. Vui lòng thử lại sau.",
          }));
        }
      }
    }
  };

  const handleCheckboxChange = (event) => setIsChecked(event.target.checked);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!validate()) return;
  
    if (password !== passwordAgain) {
      setErrors((prev) => ({
        ...prev,
        passwordAgain: "Mật khẩu không khớp.",
      }));
      return;
    }
  
    setIsLoading(true);
    try {
      // Gửi đăng ký
      await registerUser(
        username,
        fullName,
        address,
        phoneNumber,
        email,
        password,
        ["ROLE_ADMIN", "ROLE_USER"]
      );
  
      // Đăng nhập lấy token
      const loginResponse = await login(username, password);
      const token = loginResponse.token;
  
      const userProfile = {
        fullName,
        address,
        phoneNumber,
        email,
        userState: "ACTIVE",
        gender,
      };
  
      await updateUserProfileByEmail(email, userProfile, token);
  
      setSnackbarType("success");
      setSnackbarMessage("Đăng ký thành công! Chào mừng bạn.");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      if (error.response) {
        const message = error.response.data?.message?.toLowerCase() || "";
  
        if (message.includes("username")) {
          setErrors((prev) => ({
            ...prev,
            username: "Tên đăng nhập đã tồn tại.",
          }));
          return;
        }
  
        if (message.includes("email")) {
          setErrors((prev) => ({
            ...prev,
            email: "Email đã tồn tại.",
          }));
          return;
        }
      }
  
      // Lỗi khác
      setSnackbarType("error");
      setSnackbarMessage("Đăng ký thất bại. Vui lòng thử lại.");
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
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
    errorMessage,
    name
  ) => (
    <Box sx={{ m: 2, width: "90%", textAlign: "center" }}>
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
          name={name}
          onBlur={handleBlur}
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
            "Nhập tên đăng nhập",
            "text",
            username,
            setUsername,
            null,
            null,
            errors.username,
            "username"
          )}
          {renderInputField(
            "Họ và tên",
            "Nhập họ và tên",
            "text",
            fullName,
            setFullName,
            null,
            null,
            errors.fullName,
            "fullName"
          )}
          {renderInputField(
            "Địa chỉ",
            "Nhập địa chỉ",
            "text",
            address,
            setAddress,
            null,
            null,
            errors.address,
            "address"
          )}
          {renderInputField(
            "Số điện thoại",
            "Nhập số điện thoại",
            "text",
            phoneNumber,
            setPhoneNumber,
            null,
            null,
            errors.phoneNumber,
            "phoneNumber"
          )}
          {renderInputField(
            "Email",
            "Nhập email",
            "text",
            email,
            setEmail,
            null,
            null,
            errors.email,
            "email"
          )}
          {renderInputField(
            "Mật khẩu",
            "Nhập mật khẩu",
            "password",
            password,
            setPassword,
            showPassword,
            setShowPassword,
            errors.password,
            "password"
          )}
          {renderInputField(
            "Nhập lại mật khẩu",
            "Nhập lại mật khẩu",
            "password",
            passwordAgain,
            setPasswordAgain,
            showPasswordAgain,
            setShowPasswordAgain,
            errors.passwordAgain,
            "passwordAgain"
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

          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            <Typography sx={{ fontSize: 14 }}>
              Tôi đồng ý với điều khoản sử dụng
            </Typography>
          </Box>

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
