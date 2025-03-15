import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";

const AddPurchaseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [purchaseDetail, setPurchaseDetail] = useState(
    location.state?.purchaseDetailData || {
      id: "",
      created_time: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      purchasePrice: "",
      quantity: "",
      salePrice: "",
      productId: "",
      providerId: "",
    }
  );

  const products = [
    { id: "1", name: "Sản phẩm A" },
    { id: "2", name: "Sản phẩm B" },
  ];

  const providers = [
    { id: "101", name: "Nhà cung cấp X" },
    { id: "102", name: "Nhà cung cấp Y" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchaseDetail({ ...purchaseDetail, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", purchaseDetail);
    navigate("/NhapHang");
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        {purchaseDetail.id
          ? "Cập nhật Chi Tiết Mua Hàng"
          : "Thêm Chi Tiết Mua Hàng"}
      </Typography>
      <form>
        <TextField
          name="purchasePrice"
          label="Giá mua"
          value={purchaseDetail.purchasePrice}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          name="quantity"
          label="Số lượng"
          value={purchaseDetail.quantity}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          name="salePrice"
          label="Giá bán"
          value={purchaseDetail.salePrice}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant="body1">Sản phẩm</Typography>
          <Select
            name="productId"
            value={purchaseDetail.productId}
            onChange={handleChange}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant="body1">Nhà cung cấp</Typography>
          <Select
            name="providerId"
            value={purchaseDetail.providerId}
            onChange={handleChange}
          >
            {providers.map((provider) => (
              <MenuItem key={provider.id} value={provider.id}>
                {provider.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          {purchaseDetail.id
            ? "Cập nhật Chi Tiết Mua Hàng"
            : "Thêm Chi Tiết Mua Hàng"}
        </Button>
      </form>
    </Box>
  );
};

export default AddPurchaseDetail;
