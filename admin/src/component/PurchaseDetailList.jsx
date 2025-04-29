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
  Snackbar,
  Box,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { listPurchaseDetail, deletePurchaseDetail } from "../services/PurchaseDetailService";

const PurchaseDetailList = () => {
  const navigate = useNavigate();
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchPurchaseDetails = async () => {
    try {
      const response = await listPurchaseDetail();
      setPurchaseDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching purchase details:", error);
    }
  }

  useEffect(() => {
    fetchPurchaseDetails();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa chi tiết mua hàng này?")) {
      return;
    }

    try {
      const response = await deletePurchaseDetail(id);
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "Xóa chi tiết mua hàng thành công!",
          severity: "success",
        });
        fetchPurchaseDetails();
      }
    } catch (error) {
      console.error("Error deleting purchase detail:", error);
      setSnackbar({
        open: true,
        message: "Không thể xóa chi tiết mua hàng. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
                  {(detail.purchasePrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell>
                  {(detail.salePrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </TableCell>
                <TableCell>{detail.productName}</TableCell>
                <TableCell>{detail.providerName}</TableCell>

                <TableCell>
                  <Button
                    component={Link}
                    to={`/CapNhatNhapHang?id=${detail.id}`}
                    state={{ purchaseDetail: detail }}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 2 }}
                  >
                    Cập nhật
                  </Button>
                  {/* <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(detail.id)}
                  >
                    Xóa
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PurchaseDetailList;
