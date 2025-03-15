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
} from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// Dữ liệu cứng thay thế API
const mockData = [
  {
    id: 1,
    createdTime: "2024-03-10T10:30:00Z",
    purchasePrice: 100000,
    quantity: 5,
    salePrice: 120000,
    product: { name: "Laptop ASUS" },
    provider: { name: "Nhà cung cấp A" },
  },
  {
    id: 2,
    createdTime: "2024-03-11T12:45:00Z",
    purchasePrice: 50000,
    quantity: 10,
    salePrice: 65000,
    product: { name: "Chuột Logitech" },
    provider: { name: "Nhà cung cấp B" },
  },
];

const PurchaseDetailList = () => {
  const [purchaseDetails, setPurchaseDetails] = useState([]);

  useEffect(() => {
    setPurchaseDetails(mockData);
  }, []);

  const handleDelete = (id) => {
    const updatedList = purchaseDetails.filter((detail) => detail.id !== id);
    setPurchaseDetails(updatedList);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Danh Sách Chi Tiết Mua Hàng
      </Typography>
      <TableContainer component={Paper} style={{ maxHeight: 650 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Thời gian tạo</TableCell>
              <TableCell>Giá mua</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá bán</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Nhà cung cấp</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseDetails.map((detail, index) => (
              <TableRow key={detail.id} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {dayjs(detail.createdTime).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell>
                  {detail.purchasePrice.toLocaleString()} VND
                </TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell>{detail.salePrice.toLocaleString()} VND</TableCell>
                <TableCell>{detail.product.name}</TableCell>
                <TableCell>{detail.provider.name}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/CapNhatNhapHang?id=${detail.id}`}
                    state={{ purchaseDetailData: detail }}
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
                    onClick={() => handleDelete(detail.id)}
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

export default PurchaseDetailList;
