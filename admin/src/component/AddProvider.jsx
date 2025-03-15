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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const AddProvider = () => {
  const location = useLocation();
  const [provider, setProvider] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    origin: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.providerData) {
      setProvider(location.state.providerData);
    }
  }, [location.state]);

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

  const handleSubmit = async () => {
    console.log("Provider data submitted:", provider);
    navigate("/NhaCungCap");
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
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Địa chỉ"
          name="address"
          value={provider.address}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email"
          name="email"
          value={provider.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth>
          <InputLabel id="select">Xuất xứ</InputLabel>
          <Select
            id="select"
            name="origin"
            label="Xuất xứ"
            value={provider.origin}
            onChange={handleChange}
          >
            <MenuItem value="CHINA">CHINA</MenuItem>
            <MenuItem value="SOUTH_KOREA">SOUTH_KOREA</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="JAPAN">JAPAN</MenuItem>
            <MenuItem value="TAIWAN">TAIWAN</MenuItem>
            <MenuItem value="INDIA">INDIA</MenuItem>
            <MenuItem value="VIETNAM">VIETNAM</MenuItem>
            <MenuItem value="GERMANY">GERMANY</MenuItem>
            <MenuItem value="SWEDEN">SWEDEN</MenuItem>
            <MenuItem value="FINLAND">FINLAND</MenuItem>
          </Select>
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
