import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  listProduct,
  deleteProduct,
  getInventories,
  checkProductCanDelete,
} from "../services/ProductService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deletableProducts, setDeletableProducts] = useState({});

  const checkCanDeleteProducts = async (productIds) => {
    const deletabilityMap = {};

    await Promise.all(
      productIds.map(async (id) => {
        try {
          const response = await checkProductCanDelete(id);
          deletabilityMap[id] = response.data.canDelete;
        } catch (error) {
          console.error(`Không thể kiểm tra khả năng xóa sản phẩm ${id}:`, error);
          deletabilityMap[id] = false;
        }
      })
    );

    setDeletableProducts(deletabilityMap);
  };

  const fetchProducts = async () => {
    try {
      const [productRes, inventoryRes] = await Promise.all([
        listProduct(),
        getInventories(),
      ]);

      const products = productRes.data.data;
      const inventories = inventoryRes.data.data;

      const merged = products.map((product) => {
        const inventory = inventories.find((inv) => inv.productId === product.id);
        return {
          ...product,
          quantity: inventory ? inventory.quantity : 0,
        };
      });

      setProducts(merged);
      setFilteredProducts(merged);

      await checkCanDeleteProducts(merged.map((p) => p.id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const checkResponse = await checkProductCanDelete(id);
      if (!checkResponse.data.canDelete) {
        alert("Sản phẩm này không thể xóa vì đã được sử dụng trong đơn hàng.");
        return;
      }

      if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        return;
      }

      await deleteProduct(id);
      console.log("Sản phẩm đã được xóa thành công.");
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Không thể xóa sản phẩm. Lỗi: " + (error.response?.data?.message || error.message));
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Danh Sách Sản Phẩm
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Danh mục</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Danh mục"
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="PHONE">Điện thoại</MenuItem>
          <MenuItem value="EARPHONE">Tai nghe</MenuItem>
          <MenuItem value="POWER_BANK">Sạc dự phòng</MenuItem>
          <MenuItem value="CHARGING_CABLE">Cáp sạc</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper} style={{ maxHeight: 650 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Thương hiệu</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá nhập</TableCell>
              <TableCell>Giá bán</TableCell>
              <TableCell>Giảm giá (%)</TableCell>
              <TableCell>Giá đã giảm</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow key={product.id} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  {product.purchasePrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>
                <TableCell>
                  {product.salePrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>
                <TableCell>{product.percentDiscount}%</TableCell>
                <TableCell>
                  {product.discountedPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>
                <TableCell>
                  <img
                    src={product.url}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginTop: 30,
                      resizeMode: "contain",
                    }}
                    alt={product.name}
                  />
                </TableCell>
                <TableCell sx={{ display: "flex", mt: 10 }}>
                  <Button
                    component={Link}
                    to={`/CapNhatSanPham?id=${product.id}`}
                    state={{ productData: product }}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 2, mb: 7, width: "100px" }}
                  >
                    Cập nhật
                  </Button>
                  {deletableProducts[product.id] && (
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{
                        mb: 7,
                        width: "100px",
                      }}
                      onClick={() => handleDelete(product.id)}
                    >
                      Xóa
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;