import React, { useState } from "react";
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

const mockCustomers = [
  {
    id: 1,
    url: "https://via.placeholder.com/100",
    fullName: "Nguyễn Văn A",
    address: "Hà Nội",
    coin: 500,
    email: "nguyenvana@example.com",
    gender: "Nam",
    phoneNumber: "0123456789",
    userState: "Hoạt động",
  },
  {
    id: 2,
    url: "https://via.placeholder.com/100",
    fullName: "Trần Thị B",
    address: "TP. Hồ Chí Minh",
    coin: 700,
    email: "tranthib@example.com",
    gender: "Nữ",
    phoneNumber: "0987654321",
    userState: "Bị cấm",
  },
];

const CustomerList = () => {
  const [customer, setCustomer] = useState(mockCustomers);

  const handleChangeState = (id) => {
    setCustomer((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              userState:
                customer.userState === "Hoạt động" ? "Bị cấm" : "Hoạt động",
            }
          : customer
      )
    );
  };

  const handleDeleteUser = (id) => {
    setCustomer((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== id)
    );
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Danh Sách Khách Hàng
      </Typography>
      <TableContainer component={Paper} style={{ maxHeight: 650 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Url</TableCell>
              <TableCell>Tên khách hàng</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Coin</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.map((customer, index) => (
              <TableRow key={customer.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={customer.url}
                    alt="Customer"
                    style={{ width: "100px", height: "auto" }}
                  />
                </TableCell>
                <TableCell>{customer.fullName}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.coin}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.gender}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.userState}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    <Button
                      component={Link}
                      to={`/CapNhatKhachHang?id=${customer.id}`}
                      state={{ customerData: customer }}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleChangeState(customer.id)}
                    >
                      Cấm
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteUser(customer.id)}
                    >
                      Xóa
                    </Button>
                    <Button
                      component={Link}
                      to={`/ThongTinKhachHang?id=${customer.id}`}
                      state={{ customerData: customer }}
                      variant="contained"
                      color="info"
                      size="small"
                    >
                      Xem chi tiết
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerList;
