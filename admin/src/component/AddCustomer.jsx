import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser, saveUser } from "../services/UserService";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AddCustomer = () => {
  const location = useLocation();
  const [customer, setCustomer] = useState({
    id: "",
    fullName: "",
    gender: "",
    phoneNumber: "",
    address: "",
    email: "",
    coin: "",
    url: "",
    userState: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (location.state && location.state.customerData) {
      setCustomer(location.state.customerData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") {
      const capital = value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      setCustomer({ ...customer, [name]: capital });
    } else {
      setCustomer({ ...customer, [name]: value });
    }
  };

  const validate = () => {
    const error = {};
    if (!customer.fullName.trim()) {
      error.fullName = "Tên người dùng không được để trống";
    }
    if (!customer.address.trim()) {
      error.address = "Địa chỉ không được để trống";
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(customer.email.trim())) {
      error.email = "Email không hợp lệ";
    }

    if (!customer.password.trim()) {
      error.password = "Mật khẩu không được để trống";
    }
    const phoneRegex = /^0\d{9,}$/;
    if (!phoneRegex.test(customer.phoneNumber.trim())) {
      error.phoneNumber =
        "Số điện thoại phải có ít nhất 10 kí tự và bắt đầu bằng số 0";
    }
    if (!customer.userState) {
      error.userState = "Trạng thái bắt buộc chọn";
    }
    if (!customer.gender) {
      error.gender = "Giới tính là bắt buộc";
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      if (customer.id) {
        const response = await updateUser(customer.id, customer);
        console.log("Customer data updated:", response.data);
        navigate("/DanhSachKhachHang"); // Chuyển hướng đến danh sách khách hàng
      } else {
        const response = await saveUser(customer);
        console.log("Customer added:", response.data);
        navigate("/DanhSachKhachHang"); // Chuyển hướng đến danh sách khách hàng
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomer({ ...customer, url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        {customer.id ? "Cập nhật Khách Hàng" : "Thêm Khách Hàng"}
      </Typography>
      <form>
        {customer.id && (
          <TextField
            label="ID"
            name="id"
            value={customer.id}
            fullWidth
            disabled
            sx={{ mb: 2 }}
          />
        )}
        <TextField
          label="Tên khách hàng"
          name="fullName"
          value={customer.fullName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Giới tính
          </Typography>
          <RadioGroup
            name="gender"
            value={customer.gender}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="MALE" control={<Radio />} label="Nam" />
            <FormControlLabel value="FEMALE" control={<Radio />} label="Nữ" />
            <FormControlLabel value="OTHER" control={<Radio />} label="Khác" />
          </RadioGroup>
          {errors.gender && (
            <Typography color="red" variant="caption">
              {errors.gender}
            </Typography>
          )}
        </FormControl>
        <TextField
          label="Mật khẩu"
          name="password"
          type={showPassword ? "text" : "password"}
          value={customer.password}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Số điện thoại"
          name="phoneNumber"
          value={customer.phoneNumber}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <TextField
          label="Địa chỉ"
          name="address"
          value={customer.address}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.address}
          helperText={errors.address}
        />
        <TextField
          label="Email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Coin"
          name="coin"
          value={customer.coin}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {customer.url && (
            <Box
              component="img"
              src={customer.url}
              alt="Preview"
              sx={{
                mt: 2,
                width: "200px",
                height: "200px",
                objectFit: "cover",
                mb: 2,
                border: "1px solid lightgray",
                borderRadius: 5,
              }}
            />
          )}

          <Button
            variant="contained"
            component="label"
            sx={{ mt: 1, width: "10%" }}
          >
            Chọn ảnh
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
            />
          </Button>
        </Box>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="select">Trạng thái</InputLabel>
          <Select
            id="select"
            name="userState"
            label="Trạng thái"
            value={customer.userState}
            onChange={handleChange}
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="BANNED">BANNED</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </Select>
          {errors.userState && (
            <Typography color="error" variant="caption">
              {errors.userState}
            </Typography>
          )}
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, ml: 50 }}
        >
          {customer.id ? "Cập nhật Khách Hàng" : "Thêm Khách Hàng"}
        </Button>
      </form>
    </Box>
  );
};

export default AddCustomer;
