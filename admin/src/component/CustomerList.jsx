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
import { listUser, updateStateUser } from "../services/UserService";

const CustomerList = () => {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await listUser();
      if (res && res.data && Array.isArray(res.data.data)) {
        setCustomer(res.data.data);
      } else {
        console.log("Không có dữ liệu khách hàng");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error);
    }
  };

  const handleChangeState = async (id, currentState) => {
    if (currentState !== "ACTIVE") return; // chỉ cho phép cấm khi đang active
    try {
      await updateStateUser(id, "BANNED");
      fetchCustomers();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
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
            {customer && customer.length > 0 ? (
              customer.map((customer, index) => (
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

                      {/* Nút thay đổi trạng thái dựa theo userState */}
                      {customer.userState === "ACTIVE" && (
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() =>
                            handleChangeState(customer.id, customer.userState)
                          }
                        >
                          Cấm
                        </Button>
                      )}
                      {customer.userState === "BANNED" && (
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          disabled
                        >
                          Đang bị cấm
                        </Button>
                      )}
                      {customer.userState === "INACTIVE" && (
                        <Button
                          variant="contained"
                          color="inherit"
                          size="small"
                          disabled
                        >
                          Không hoạt động
                        </Button>
                      )}

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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  Không có dữ liệu khách hàng.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerList;
