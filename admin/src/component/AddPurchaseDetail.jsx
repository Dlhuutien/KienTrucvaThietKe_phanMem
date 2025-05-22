import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Snackbar,
  Alert
} from "@mui/material";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import { getListProductNames, getListProviderNames, addPurchaseDetail, updatePurchaseDetail } from '../services/PurchaseDetailService'

const AddPurchaseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productNames, setProductNames] = useState([]);
  const [providerNames, setProviderNames] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    const fetchProductNames = async () => {
      try {
        const response = await getListProductNames();
        if (response && response.data) {
          setProductNames(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product names:", error);
        setSnackbar({
          open: true,
          message: "Không thể tải danh sách sản phẩm",
          severity: "error"
        });
      }
    };

    const fetchProviderNames = async () => {
      try {
        const response = await getListProviderNames();
        if (response && response.data) {
          setProviderNames(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching provider names:", error);
        setSnackbar({
          open: true,
          message: "Không thể tải danh sách nhà cung cấp",
          severity: "error"
        });
      }
    };

    fetchProductNames();
    fetchProviderNames();
  }, []);

  const [purchaseDetail, setPurchaseDetail] = useState({
    id: "",
    created_time: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    purchasePrice: "",
    quantity: "",
    salePrice: "",
    productName: "",
    providerName: "",
  });

  useEffect(() => {
    if (location.state && location.state.purchaseDetail) {
      setPurchaseDetail(location.state.purchaseDetail);
    }
  }, [location.state]);

  const validate = (fieldName) => {
    let tempErrors = { ...errors };
    if (!fieldName || fieldName === "purchasePrice") {
      if (!purchaseDetail.purchasePrice) {
        tempErrors.purchasePrice = "Giá mua không được để trống.";
      }
      else if (isNaN(purchaseDetail.purchasePrice)) {
        tempErrors.purchasePrice = "Giá mua phải là kiểu số thực.";
      } else if (parseFloat(purchaseDetail.purchasePrice) < 0) {
        tempErrors.purchasePrice = "Giá mua không được âm.";
      } else {
        delete tempErrors.purchasePrice;
      }
    }
    if (!fieldName || fieldName === "quantity") {
      if (!purchaseDetail.quantity) {
        tempErrors.quantity = "Số lượng không được trống.";
      } else if (isNaN(purchaseDetail.quantity)) {
        tempErrors.quantity = "Số lượng phải là kiểu số nguyên.";
      } else if (parseInt(purchaseDetail.quantity) < 0) {
        tempErrors.quantity = "Số lượng không được âm.";
      } else {
        delete tempErrors.quantity;
      }
    }
    if (!fieldName || fieldName === "salePrice") {
      if (!purchaseDetail.salePrice) {
        tempErrors.salePrice = "Giá bán không được trống.";
      } else if (isNaN(purchaseDetail.salePrice)) {
        tempErrors.salePrice = "Giá bán phải là kiểu số thực.";
      } else if (parseFloat(purchaseDetail.salePrice) < 0) {
        tempErrors.salePrice = "Giá bán không được âm.";
      } else {
        delete tempErrors.salePrice;
      }
    }
    if (!fieldName || fieldName === "productName") {
      if (!purchaseDetail.productName) {
        tempErrors.productName = "Sản phẩm không được trống.";
      } else {
        delete tempErrors.productName;
      }
    }
    if (!fieldName || fieldName === "providerName") {
      if (!purchaseDetail.providerName) {
        tempErrors.providerName = "Nhà cung cấp không được trống.";
      } else {
        delete tempErrors.providerName;
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchaseDetail({
      ...purchaseDetail,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validate(name);
  };

  const handleSubmit = async (e) => {
    console.log("Submit button clicked");
    e.preventDefault();
    if (!validate()) {
      setSnackbar({
        open: true,
        message: "Vui lòng kiểm tra lại thông tin nhập vào.",
        severity: "error",
      });
      return;
    }

    const dataToSend = {
      productName: purchaseDetail.productName,
      providerName: purchaseDetail.providerName,
      purchasePrice: parseFloat(purchaseDetail.purchasePrice),
      salePrice: parseFloat(purchaseDetail.salePrice),
      quantity: parseInt(purchaseDetail.quantity),
      createdTime: purchaseDetail.created_time
    };

    console.log("Data being sent:", JSON.stringify(dataToSend));

    setIsSubmitting(true);
    try {
      console.log("Before API call");
      const response = await addPurchaseDetail(dataToSend);
      console.log("API response:", response);
      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: "Thêm chi tiết mua hàng thành công!",
          severity: "success",
        });
        navigate("/NhapHang");
      }
    } catch (error) {
      console.error("Error adding purchase detail:", error);
      setSnackbar({
        open: true,
        message: "Không thể thêm chi tiết mua hàng. Vui lòng thử lại.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUpdate = async () => {
    if (!validate()) {
      setSnackbar({
        open: true,
        message: "Vui lòng kiểm tra lại thông tin nhập vào.",
        severity: "error",
      });
      return;
    }

    try {
      const selectedProduct = productNames.find(
        (product) => product.name === purchaseDetail.productName
      );
      const selectedProvider = providerNames.find(
        (provider) => provider.name === purchaseDetail.providerName
      );

      const updatedDetail = {
        ...purchaseDetail,
        productId: selectedProduct ? selectedProduct.id : purchaseDetail.productId,
        providerId: selectedProvider ? selectedProvider.id : purchaseDetail.providerId,
      };

      const response = await updatePurchaseDetail(purchaseDetail.id, updatedDetail);
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "Cập nhật chi tiết mua hàng thành công!",
          severity: "success",
        });
        navigate("/NhapHang");
      }
    } catch (error) {
      console.error("Error updating purchase detail:", error);
      setSnackbar({
        open: true,
        message: "Không thể cập nhật chi tiết mua hàng. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        {purchaseDetail.id
          ? "Cập nhật Chi Tiết Mua Hàng"
          : "Thêm Chi Tiết Mua Hàng"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="purchasePrice"
          label="Giá mua"
          value={purchaseDetail.purchasePrice}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.purchasePrice && Boolean(errors.purchasePrice)}
          helperText={touched.purchasePrice && errors.purchasePrice}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="quantity"
          label="Số lượng"
          value={purchaseDetail.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.quantity && Boolean(errors.quantity)}
          helperText={touched.quantity && errors.quantity}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="salePrice"
          label="Giá bán"
          value={purchaseDetail.salePrice}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.salePrice && Boolean(errors.salePrice)}
          helperText={touched.salePrice && errors.salePrice}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControl
          fullWidth
          sx={{ mb: 2 }}
          error={touched.productName && Boolean(errors.productName)}
        >
          <Typography variant="body1">Sản phẩm</Typography>
          <Select
            name="productName"
            value={purchaseDetail.productName}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {productNames.map((productName, index) => (
              <MenuItem key={index} value={productName}>
                {productName}
              </MenuItem>
            ))}
          </Select>
          {touched.productName && errors.productName && (
            <FormHelperText>{errors.productName}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          sx={{ mb: 2 }}
          error={touched.providerName && Boolean(errors.providerName)}
        >
          <Typography variant="body1">Nhà cung cấp</Typography>
          <Select
            name="providerName"
            value={purchaseDetail.providerName}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {providerNames.map((providerName, index) => (
              <MenuItem key={index} value={providerName}>
                {providerName}
              </MenuItem>
            ))}
          </Select>
          {touched.providerName && errors.providerName && (
            <FormHelperText>{errors.providerName}</FormHelperText>
          )}
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          type="button"
          disabled={isSubmitting}
          onClick={purchaseDetail.id ? handleUpdate : handleSubmit}
          sx={{ mt: 2 }}
        >
          {isSubmitting
            ? "Đang xử lý..."
            : purchaseDetail.id
              ? "Cập nhật Chi Tiết Mua Hàng"
              : "Thêm Chi Tiết Mua Hàng"}
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddPurchaseDetail;