import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { addProduct, updateProduct } from "../services/ProductService";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AddProduct = () => {
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const [product, setProduct] = useState({
    category: "",
    name: "",
    brand: "",
    url: "",
    // quantity: "",
    // purchasePrice: "1",
    // salePrice: "1",
    //phone
    chip: "",
    os: null,
    ram: null,
    rom: null,
    screenSize: "",
    //power_bank
    capacity: "",
    fastCharging: "",
    input: "",
    output: "",
    // earphone
    connectionType: null,
    batteryLife: "",
    //charging_cable
    cableType: null,
    length: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.productData) {
      setProduct(location.state.productData);
    }
  }, [location.state]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProduct({ ...product, url: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if (name === "screenSize" && value > 3.2) {
    //   alert("Kích thước màn hình không thể lớn hơn 3.2 inch");
    //   return;
    // }

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const validate = () => {
    const error = {};

    // Kiểm tra category, name, và brand
    if (!product.category) {
      error.category = "Loại sản phẩm là bắt buộc.";
    }

    if (!product.name.trim()) {
      error.name = "Tên sản phẩm không được để trống.";
    } else if (!/^[\p{L}0-9\s!@#$%^&*()_+=\-,.]+$/u.test(product.name)) {
      error.name = "Tên sản phẩm không được chứa ký tự đặc biệt.";
    }

    if (!product.brand) {
      error.brand = "Thương hiệu là bắt buộc.";
    }

    // Kiểm tra URL (base64)
    if (!product.url.trim()) {
      error.url = "URL không được để trống.";
    } else if (
      !/^data:image\/(jpeg|jpg|png|gif|webp);base64,.+$/.test(product.url)
    ) {
      error.url =
        "URL ảnh phải có định dạng .jpg, .jpeg, .png hoặc .gif dưới dạng base64.";
    }

    // Kiểm tra các trường theo category
    if (product.category === "PHONE") {
      if (!product.chip.trim()) {
        error.chip = "Chip không được để trống.";
      }

      if (!product.os) {
        error.os = "Hệ điều hành là bắt buộc.";
      }

      if (!product.ram) {
        error.ram = "RAM là bắt buộc.";
      }

      if (!product.rom) {
        error.rom = "ROM là bắt buộc.";
      }

      if (!product.screenSize) {
        error.screenSize = "Kích thước màn hình là bắt buộc.";
      } else if (product.screenSize <= 0 || product.screenSize > 100) {
        error.screenSize =
          "Kích thước màn hình phải lớn hơn 0 và nhỏ hơn 100 inch.";
      }
    }

    if (product.category === "POWER_BANK") {
      if (!product.capacity) {
        error.capacity = "Dung lượng là bắt buộc.";
      } else if (product.capacity <= 0) {
        error.capacity = "Dung lượng phải lớn hơn 0.";
      }

      if (!product.connectionType) {
        error.connectionType = "Loại kết nối là bắt buộc.";
      }

      if (!product.fastCharging) {
        error.fastCharging = "Sạc nhanh là bắt buộc.";
      } else if (product.fastCharging <= 0) {
        error.fastCharging = "Sạc nhanh phải lớn hơn 0.";
      }

      if (!product.input.trim()) {
        error.input = "Cổng đầu vào không được để trống.";
      }

      if (!product.output.trim()) {
        error.output = "Cổng đầu ra không được để trống.";
      }
    }

    if (product.category === "EARPHONE") {
      if (!product.batteryLife) {
        error.batteryLife = "Thời gian sử dụng là bắt buộc.";
      } else if (product.batteryLife <= 0) {
        error.batteryLife = "Thời gian sử dụng phải lớn hơn 0.";
      }

      if (!product.connectionType) {
        error.connectionType = "Loại kết nối là bắt buộc.";
      }
    }

    if (product.category === "CHARGING_CABLE") {
      if (!product.cableType) {
        error.cableType = "Loại cáp là bắt buộc.";
      }

      if (!product.length) {
        error.length = "Chiều dài là bắt buộc.";
      } else if (product.length <= 0) {
        error.length = "Chiều dài phải lớn hơn 0.";
      }
    }

    // Loại bỏ lỗi khi trường hợp nhập đúng
    for (const key in error) {
      if (error[key] === "") {
        // Nếu không có lỗi, xóa khỏi object error
        delete error[key];
      }
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      let response;
      if (product.id) {
        response = await updateProduct(product.id, product);
        console.log("Product updated:", response.data);
      } else {
        response = await addProduct(product);
        console.log("Product added:", response.data);
      }
      navigate("/DanhSachSanPham");
    } catch (error) {
      console.error(
        "Error occurred:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        {product.id ? "Cập nhật Sản Phẩm" : "Thêm Sản Phẩm"}
      </Typography>
      <form action="">
        {product.id && (
          <TextField
            label="ID"
            name="id"
            value={product.id}
            fullWidth
            disabled
            sx={{ mb: 2 }}
          />
        )}

        {/* Chọn loại sản phẩm */}
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.category}>
          <InputLabel>Loại sản phẩm</InputLabel>
          <Select
            label="Loại sản phẩm"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <MenuItem value="PHONE">Điện thoại</MenuItem>
            <MenuItem value="POWER_BANK">Pin sạc dự phòng</MenuItem>
            <MenuItem value="EARPHONE">Tai nghe</MenuItem>
            <MenuItem value="CHARGING_CABLE">Dây sạc</MenuItem>
          </Select>
          {errors.category && (
            <Typography color="error" variant="caption">
              {errors.category}
            </Typography>
          )}
        </FormControl>

        {/* Tên sản phẩm */}
        <TextField
          label="Tên sản phẩm"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.name}
          helperText={errors.name}
        />

        {/* Thương hiệu */}
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.brand}>
          <InputLabel>Thương hiệu</InputLabel>
          <Select
            label="Thương hiệu"
            name="brand"
            value={product.brand}
            onChange={handleChange}
          >
            <MenuItem value="APPLE">APPLE</MenuItem>
            <MenuItem value="GOOGLE">GOOGLE</MenuItem>
            <MenuItem value="HUAWEI">HUAWEI</MenuItem>
            <MenuItem value="NOKIA">NOKIA</MenuItem>
            <MenuItem value="ONEPLUS">ONEPLUS</MenuItem>
            <MenuItem value="OPPO">OPPO</MenuItem>
            <MenuItem value="SAMSUNG">SAMSUNG</MenuItem>
            <MenuItem value="SONY">SONY</MenuItem>
            <MenuItem value="VIVO">VIVO</MenuItem>
            <MenuItem value="XIAOMI">XIAOMI</MenuItem>
          </Select>
          {errors.brand && (
            <Typography color="error" variant="caption">
              {errors.brand}
            </Typography>
          )}
        </FormControl>

        {/* Số lượng */}
        {/* <TextField
          label="Số lượng"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          type="number"
        /> */}

        {/* Giá nhập */}
        {/* <TextField
          label="Giá nhập"
          name="purchasePrice"
          value={product.purchasePrice}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          type="number"
        /> */}

        {/* Giá bán */}
        {/* <TextField
          label="Giá bán"
          name="salePrice"
          value={product.salePrice}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          type="number"
        /> */}

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {product.url && (
            <Box
              component="img"
              src={product.url}
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
          {errors.url && (
            <Typography color="error" sx={{ mt: 1, fontSize: "12px" }}>
              {errors.url}
            </Typography>
          )}
        </Box>

        {/* Các trường thuộc loại sản phẩm */}
        {/* ----------------------------------------------- */}
        {product.category === "PHONE" && (
          <>
            <Typography variant="h6" fontWeight={600}>
              Thông tin điện thoại
            </Typography>
            {/* Chip */}
            <TextField
              label="Chip"
              name="chip"
              value={product.chip}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.chip}
              helperText={errors.chip}
            />

            {/* OS (Android / iOS) */}
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.os}>
              <InputLabel>Hệ điều hành</InputLabel>
              <Select
                label="Hệ điều hành"
                name="os"
                value={product.os}
                onChange={handleChange}
              >
                <MenuItem value="ANDROID">Android</MenuItem>
                <MenuItem value="IOS">iOS</MenuItem>
              </Select>
              {errors.os && (
                <Typography color="error" variant="caption">
                  {errors.os}
                </Typography>
              )}
            </FormControl>

            {/* RAM */}
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.ram}>
              <InputLabel>RAM</InputLabel>
              <Select
                label="RAM"
                name="ram"
                value={product.ram}
                onChange={handleChange}
              >
                <MenuItem value="GB_12">12 GB</MenuItem>
                <MenuItem value="GB_16">16 GB</MenuItem>
                <MenuItem value="GB_32">32 GB</MenuItem>
                <MenuItem value="GB_4">4 GB</MenuItem>
                <MenuItem value="GB_6">6 GB</MenuItem>
                <MenuItem value="GB_64">64 GB</MenuItem>
                <MenuItem value="GB_8">8 GB</MenuItem>
              </Select>
              {errors.ram && (
                <Typography color="error" variant="caption">
                  {errors.ram}
                </Typography>
              )}
            </FormControl>

            {/* ROM */}
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.rom}>
              <InputLabel>ROM</InputLabel>
              <Select
                label="ROM"
                name="rom"
                value={product.rom}
                onChange={handleChange}
              >
                <MenuItem value="GB_128">128 GB</MenuItem>
                <MenuItem value="GB_16">16 GB</MenuItem>
                <MenuItem value="GB_256">256 GB</MenuItem>
                <MenuItem value="GB_32">32 GB</MenuItem>
                <MenuItem value="GB_512">512 GB</MenuItem>
                <MenuItem value="GB_64">64 GB</MenuItem>
                <MenuItem value="TB_1">1 TB</MenuItem>
                <MenuItem value="TB_2">2 TB</MenuItem>
                <MenuItem value="TB_4">4 TB</MenuItem>
              </Select>
              {errors.rom && (
                <Typography color="error" variant="caption">
                  {errors.rom}
                </Typography>
              )}
            </FormControl>

            {/* Kích thước màn hình */}
            <TextField
              label="Kích thước màn hình (inch)"
              name="screenSize"
              value={product.screenSize}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              type="number"
              error={!!errors.screenSize}
              helperText={errors.screenSize}
            />
          </>
        )}

        {/* ----------------------------------------------- */}
        {product.category === "POWER_BANK" && (
          <>
            <Typography variant="h6" fontWeight={600}>
              Thông tin pin sạc dự phòng
            </Typography>
            {/* Capacity */}
            <TextField
              label="Dung lượng (mAh)"
              name="capacity"
              value={product.capacity}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              type="number"
              error={!!errors.capacity}
              helperText={errors.capacity}
            />

            {/* Connection type */}
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.connectionType}
            >
              <InputLabel>Loại kết nối</InputLabel>
              <Select
                label="Loại kết nối"
                name="connectionType"
                value={product.connectionType}
                onChange={handleChange}
              >
                <MenuItem value="BLUETOOTH">Bluetooth</MenuItem>
                <MenuItem value="USB">USB</MenuItem>
                <MenuItem value="WIRELESS">Wireless</MenuItem>
              </Select>
              {errors.connectionType && (
                <Typography color="error" variant="caption">
                  {errors.connectionType}
                </Typography>
              )}
            </FormControl>

            {/* Fast Charging */}
            <TextField
              label="Sạc nhanh (W)"
              name="fastCharging"
              value={product.fastCharging}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              type="number"
              error={!!errors.fastCharging}
              helperText={errors.fastCharging}
            />

            {/* Input */}
            <TextField
              label="Cổng đầu vào"
              name="input"
              value={product.input}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.input}
              helperText={errors.input}
            />

            {/* Output */}
            <TextField
              label="Cổng đầu ra"
              name="output"
              value={product.output}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.output}
              helperText={errors.output}
            />
          </>
        )}
        {/* ----------------------------------------------- */}
        {product.category === "EARPHONE" && (
          <>
            <Typography variant="h6" fontWeight={600}>
              Thông tin tai nghe
            </Typography>
            {/* Battery life */}
            <TextField
              label="Thời gian sử dụng (h)"
              name="batteryLife"
              value={product.batteryLife}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              type="number"
              error={!!errors.batteryLife}
              helperText={errors.batteryLife}
            />

            {/* Connection type */}
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.connectionType}
            >
              <InputLabel>Loại kết nối</InputLabel>
              <Select
                label="Loại kết nối"
                name="connectionType"
                value={product.connectionType}
                onChange={handleChange}
              >
                <MenuItem value="BLUETOOTH">Bluetooth</MenuItem>
                <MenuItem value="USB">USB</MenuItem>
                <MenuItem value="WIRELESS">Wireless</MenuItem>
              </Select>
              {errors.connectionType && (
                <Typography color="error" variant="caption">
                  {errors.connectionType}
                </Typography>
              )}
            </FormControl>
          </>
        )}

        {/* ----------------------------------------------- */}
        {product.category === "CHARGING_CABLE" && (
          <>
            <Typography variant="h6" fontWeight={600}>
              Thông tin cáp sạc
            </Typography>
            {/* Cable type */}
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.cableType}>
              <InputLabel>Loại cáp</InputLabel>
              <Select
                label="Loại cáp"
                name="cableType"
                value={product.cableType}
                onChange={handleChange}
              >
                <MenuItem value="LIGHTNING">Lightning</MenuItem>
                <MenuItem value="MICRO_USB">Micro USB</MenuItem>
                <MenuItem value="TYPE_C">Type C</MenuItem>
                <MenuItem value="USB_A">USB A</MenuItem>
                <MenuItem value="USB_B">USB B</MenuItem>
              </Select>
              {errors.cableType && (
                <Typography color="error" variant="caption">
                  {errors.cableType}
                </Typography>
              )}
            </FormControl>

            {/* Length */}
            <TextField
              label="Chiều dài (cm)"
              name="length"
              value={product.length}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              type="number"
              error={!!errors.length}
              helperText={errors.length}
            />
          </>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, ml: 50 }}
        >
          {product.id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
