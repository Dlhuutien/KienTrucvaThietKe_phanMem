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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { message } from "antd";

// Lấy giỏ hàng từ localStorage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Định dạng tiền tệ Việt Nam
const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);

  // Hàm tính lại totalPrice khi giỏ hàng thay đổi
  const calculateTotalPrice = (product) => {
    return product.quantity * product.salePrice;
  };

  // Load giỏ hàng từ localStorage khi component được mount
  useEffect(() => {
    const cart = getCartFromLocalStorage();

    // Tính toán tổng tiền cho mỗi sản phẩm khi giỏ hàng được load
    const updatedCart = cart.map((product) => ({
      ...product,
      totalPrice: calculateTotalPrice(product),
    }));

    setProducts(updatedCart);
  }, []);

  // Hàm xử lý thay đổi số lượng sản phẩm
  const handleQuantityChange = (index, delta) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const updatedQuantity = updatedProducts[index].quantity + delta;

      if (updatedQuantity >= 1) {
        // Nếu số lượng >= 1, cập nhật lại số lượng và tính toán totalPrice
        updatedProducts[index].quantity = updatedQuantity;
        updatedProducts[index].totalPrice = calculateTotalPrice(
          updatedProducts[index]
        );
      } else {
        // Nếu số lượng < 1, xóa sản phẩm khỏi giỏ hàng
        updatedProducts.splice(index, 1);
        message.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
      }

      // Lưu giỏ hàng sau khi thay đổi
      saveCartToLocalStorage(updatedProducts);

      message.success("Thay đổi số lượng sản phẩm thành công!");

      return updatedProducts;
    });
  };

  // Hàm xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveProduct = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((_, i) => i !== index);
      saveCartToLocalStorage(updatedProducts); // Lưu lại giỏ hàng
      message.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
      return updatedProducts;
    });
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
                <TableCell>
                  {product.totalPrice
                    ? formatCurrency(product.totalPrice)
                    : "-"}
                </TableCell>
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
              products.reduce((total, product) => total + product.totalPrice, 0)
            )}
          </Typography>
          <Typography>Thuế: 0</Typography>
          <Typography>Giảm: 0</Typography>
          <Typography variant="h6">
            Tổng thanh toán:{" "}
            {formatCurrency(
              products.reduce((total, product) => total + product.totalPrice, 0)
            )}
          </Typography>
        </Box>
      </Box>

      <Button variant="contained" color="primary" width sx={{ marginTop: 2 }}>
        Thanh toán
      </Button>
    </Box>
  );
};

export default ShoppingCart;
