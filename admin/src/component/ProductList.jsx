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

const mockProducts = [
  {
    id: 1,
    name: "iPhone 15",
    brand: "Apple",
    category: "PHONE",
    quantity: 10,
    purchasePrice: 20000000,
    salePrice: 25000000,
    percentDiscount: 10,
    discountedPrice: 22500000,
    url: "https://example.com/iphone15.jpg",
  },
  {
    id: 2,
    name: "Galaxy Buds Pro",
    brand: "Samsung",
    category: "EARPHONE",
    quantity: 15,
    purchasePrice: 3000000,
    salePrice: 3500000,
    percentDiscount: 5,
    discountedPrice: 3325000,
    url: "https://example.com/galaxybuds.jpg",
  },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  const handleDelete = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    setFilteredProducts(newProducts);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setFilteredProducts(
      category === ""
        ? products
        : products.filter((p) => p.category === category)
    );
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Danh Sách Sản Phẩm
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Danh mục</InputLabel>
        <Select value={selectedCategory} onChange={handleCategoryChange}>
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="PHONE">Điện thoại</MenuItem>
          <MenuItem value="EARPHONE">Tai nghe</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Thương hiệu</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Giá bán</TableCell>
              <TableCell>Giảm giá</TableCell>
              <TableCell>Giá đã giảm</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
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
                    alt={product.name}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/CapNhatSanPham?id=${product.id}`}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
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
