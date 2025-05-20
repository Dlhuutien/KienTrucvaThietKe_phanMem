import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  Divider,
  IconButton,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { message } from "antd";
import { getCartByUserId } from "../services/DisplayCartService";
import {
  updateCartDetailQuantity,
  deleteCartDetail,
} from "../services/AddCartDetailService";
import { useNavigate } from "react-router-dom";
import { createPayment } from "../services/PaymentService"; 

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const userId = localStorage.getItem("userId");
    if (userId == null) {
      console.log("userId", userId);
      setOpenModal(true);
      return;
    }

    getCartByUserId(userId)
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Lỗi khi tải giỏ hàng:", err);
        message.error("Không thể tải giỏ hàng.");
      });
  };

  const handleQuantityChange = async (index, delta) => {
    const product = products[index];
    const newQuantity = product.quantity + delta;

    try {
      if (newQuantity <= 0) {
        await deleteCartDetail(product.id);
        message.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
      } else {
        await updateCartDetailQuantity(product.id, newQuantity);
        message.success("Cập nhật số lượng thành công!");
      }
      loadCart();
    } catch (err) {
      message.error("Có lỗi xảy ra khi thay đổi số lượng!");
    }
  };

  const handleRemoveProduct = async (index) => {
    const product = products[index];
    try {
      await deleteCartDetail(product.id);
      message.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
      loadCart();
    } catch (err) {
      message.error("Không thể xóa sản phẩm!");
    }
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      message.error("Bạn cần đăng nhập để thanh toán.");
      return;
    }
  
    const totalAmount = products.reduce((total, p) => total + p.totalPrice, 0);
  
    const paymentData = {
      userId: parseInt(userId),
      amount: totalAmount,
      currency: "VND", // hoặc "usd" nếu dùng Stripe test
      successUrl: "https://temgfrontend-git-deloy-dlhuutiens-projects.vercel.app/payment-success",
      cancelUrl: "https://temgfrontend-git-deloy-dlhuutiens-projects.vercel.app/payment-cancel",
    };
  
    try {
      const response = await createPayment(paymentData);
      // window.location.href = response.data.paymentUrl; // Redirect đến trang thanh toán Stripe
      window.location.href = response.data.checkoutUrl;
      console.log("checkoutUrl:", response.data);
    } catch (err) {
      console.error("Thanh toán thất bại:", err);
      message.error("Lỗi khi tạo thanh toán.");
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        GIỎ HÀNG
      </Typography>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Hình ảnh</TableCell>
              <TableCell sx={{ color: "white" }}>Tên sản phẩm</TableCell>
              <TableCell sx={{ color: "white" }}>Số lượng</TableCell>
              <TableCell sx={{ color: "white" }}>Đơn giá</TableCell>
              <TableCell sx={{ color: "white" }}>Thành tiền</TableCell>
              <TableCell sx={{ color: "white" }}>Xóa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    src={product.url}
                    alt={product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "6px",
                    }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleQuantityChange(index, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ marginX: 1 }}>
                      {product.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleQuantityChange(index, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>{formatCurrency(product.salePrice)}</TableCell>
                <TableCell>{formatCurrency(product.totalPrice)}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleRemoveProduct(index)}
                  >
                    X
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ marginY: 2 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography>
            Tổng:{" "}
            {formatCurrency(
              products.reduce((total, p) => total + p.totalPrice, 0)
            )}
          </Typography>
          <Typography>Thuế: 0</Typography>
          <Typography>Giảm: 0</Typography>
          <Typography variant="h6">
            Tổng thanh toán:{" "}
            {formatCurrency(
              products.reduce((total, p) => total + p.totalPrice, 0)
            )}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={handleCheckout}
      >
        Thanh toán
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Vui lòng đăng nhập!
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Bạn cần đăng nhập để vào giỏ hàng.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                setOpenModal(false);
                navigate("/login");
              }}
            >
              Đăng nhập ngay
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ShoppingCart;
