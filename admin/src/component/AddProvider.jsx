import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { addProvider, updateProvider, checkEmailUnique } from "../services/ProviderService";

const AddProvider = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [provider, setProvider] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    origin: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state && location.state.providerData) {
      setProvider(location.state.providerData);
    }
  }, [location.state]);

  const originOptions = [
    "CHINA",
    "SOUTH_KOREA",
    "USA",
    "JAPAN",
    "TAIWAN",
    "INDIA",
    "VIETNAM",
    "GERMANY",
    "SWEDEN",
    "FINLAND",
  ];

  const validate = (fieldName) => {
    let tempErrors = { ...errors };

    if (!fieldName || fieldName === "name") {
      if (!provider.name.trim()) {
        tempErrors.name = "Tên nhà cung cấp không được để trống.";
      } else if (provider.name.length > 100) {
        tempErrors.name = "Tên nhà cung cấp không được vượt quá 100 ký tự.";
      } else {
        delete tempErrors.name;
      }
    }

    if (!fieldName || fieldName === "email") {
      if (!provider.email.trim()) {
        tempErrors.email = "Email không được để trống.";
      } else if (!/\S+@\S+\.\S+/.test(provider.email)) {
        tempErrors.email = "Định dạng email không hợp lệ.";
      } else if (provider.email.length > 100) {
        tempErrors.email = "Email không được vượt quá 100 ký tự.";
      } else {
        delete tempErrors.email;
      }
    }

    if (!fieldName || fieldName === "address") {
      if (!provider.address.trim()) {
        tempErrors.address = "Địa chỉ không được để trống.";
      } else if (provider.address.length > 200) {
        tempErrors.address = "Địa chỉ không được vượt quá 200 ký tự.";
      } else {
        delete tempErrors.address;
      }
    }

    if (!fieldName || fieldName === "origin") {
      if (!provider.origin) {
        tempErrors.origin = "Xuất xứ không được để trống.";
      } else if (!originOptions.includes(provider.origin)) {
        tempErrors.origin = "Xuất xứ không hợp lệ.";
      } else {
        delete tempErrors.origin;
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const capital = value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      setProvider({ ...provider, [name]: capital });
    } else {
      setProvider({ ...provider, [name]: value });
    }
  };

  const handleBlur = async (e) => {
    const { name } = e.target;
    validate(name);

    if (name === "email" && provider.email) {
      try {
        await checkEmailUnique(provider.email, provider.id);
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
            email: "Lỗi khi kiểm tra email. Vui lòng thử lại sau.",
          }));
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (provider.email) {
      try {
        await checkEmailUnique(provider.email, provider.id);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors((prev) => ({
            ...prev,
            email: "Email này đã tồn tại.",
          }));
          return;
        }
      }
    }

    try {
      if (provider.id) {
        await updateProvider(provider.id, provider);
      } else {
        await addProvider(provider);
      }
      navigate("/NhaCungCap");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        {provider.id ? "Cập nhật Nhà Cung Cấp" : "Thêm Nhà Cung Cấp"}
      </Typography>
      <form>
        {provider.id && (
          <TextField
            label="ID"
            name="id"
            value={provider.id}
            fullWidth
            disabled
            sx={{ mb: 2 }}
          />
        )}

        <TextField
          label="Tên nhà cung cấp"
          name="name"
          value={provider.name}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.name}
          helperText={errors.name ? `* ${errors.name}` : ""}
        />

        <TextField
          label="Địa chỉ"
          name="address"
          value={provider.address}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.address}
          helperText={errors.address ? `* ${errors.address}` : ""}
        />

        <TextField
          label="Email"
          name="email"
          value={provider.email}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.email}
          helperText={errors.email ? `* ${errors.email}` : ""}
        />

        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.origin}>
          <InputLabel id="select">Xuất xứ</InputLabel>
          <Select
            id="select"
            name="origin"
            label="Xuất xứ"
            value={provider.origin}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {originOptions.map((origin) => (
              <MenuItem key={origin} value={origin}>
                {origin}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.origin ? `* ${errors.origin}` : ""}</FormHelperText>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, ml: 50 }}
        >
          {provider.id ? "Cập nhật Nhà Cung Cấp" : "Thêm Nhà Cung Cấp"}
        </Button>
      </form>
    </Box>
  );
};

export default AddProvider;
