import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const AddProduct = ({ open, handleClose, editData, setProductList }) => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    name: "",
    brand: "",
    url: "",
    // quantity: "",
    // purchasePrice: "1",
    // salePrice: "1",
    // //phone
    // chip: "",
    // os: "",
    // ram: "",
    // rom: "",
    // screenSize: "",
    // //power_bank
    // capacity: "",
    // fastCharging: "",
    // input: "",
    // output: "",
    // // earphone
    // connectionType: "",
    // batteryLife: "",
    // //charging_cable
    // cableType: "",
    // length: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (editData) {
      setProductData(editData);
    } else {
      setProductData({ name: "", price: "", quantity: "", category: "" });
    }
  }, [editData]);

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

  const handleSubmit = () => {
    if (editData) {
      setProductList((prevList) =>
        prevList.map((item) =>
          item.id === editData.id ? { ...productData, id: editData.id } : item
        )
      );
    } else {
      setProductList((prevList) => [
        ...prevList,
        { ...productData, id: new Date().getTime() },
      ]);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{editData ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Product Name"
          name="name"
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

        {/* URL */}
        <TextField
          label="URL"
          name="url"
          value={product.url}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.url}
          helperText={errors.url}
        />

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
      </DialogActions>
    </Dialog>
  );
};

AddProduct.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  editData: PropTypes.object,
  setProductList: PropTypes.func.isRequired,
};

export default AddProduct;
