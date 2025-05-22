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
} from "@mui/material";
import { Link } from "react-router-dom";
import { listProduct, deleteProduct, getInventories } from "../services/ProductService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = async () => {
    try {
      const [productRes, inventoryRes] = await Promise.all([
        listProduct(),
        getInventories()
      ]);
  
      const products = productRes.data.data;
      const inventories = inventoryRes.data.data;
  
      // Gán quantity cho mỗi product từ inventory
      const merged = products.map(product => {
        const inventory = inventories.find(inv => inv.productId === product.id);
        return {
          ...product,
          quantity: inventory ? inventory.quantity : 0
        };
      });
  
      setProducts(merged);
      setFilteredProducts(merged);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      console.log("Product deleted successfully.");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
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

      {/* Filter by Category */}
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

      {/* Product List */}
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
              {/* <TableCell>Giảm giá (%)</TableCell>
              <TableCell>Giá đã giảm</TableCell> */}
              <TableCell>URL</TableCell>
              <TableCell>Action</TableCell>
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
                  {product.purchasePrice > 1
                    ? product.purchasePrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : "Chưa nhập hàng"}
                </TableCell>
                <TableCell>
                  {product.salePrice > 1
                    ? product.salePrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : "Chưa nhập hàng"}
                </TableCell>
                {/* <TableCell>{product.percentDiscount}%</TableCell> */}
                {/* <TableCell>
                  {product.discountedPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell> */}

                <TableCell>
                  <img
                    src={product.url}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginTop: 30,
                      resizeMode: "contain",
                    }}
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
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ mb: 7 }}
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </Button>
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