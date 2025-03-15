import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomerDetail = () => {
  const navigate = useNavigate();
  const [customer] = useState({
    id: "1",
    fullName: "Nguyễn Văn A",
    gender: "Nam",
    phoneNumber: "0123456789",
    address: "123 Đường ABC, TP.HCM",
    email: "nguyenvana@example.com",
    coin: "5000",
    url: "https://via.placeholder.com/120",
    userState: "Hoạt động",
    password: "********",
  });

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
        width: "50%",
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "50%",
          border: "2px solid #ccc",
        }}
      >
        <img
          src={customer.url}
          alt="Profile"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box sx={{ width: 120, margin: "0 auto", overflow: "hidden", mt: 2 }}>
        <Typography variant="h6">{customer.fullName}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          gap: "20%",
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">Tên đầy đủ</Typography>
          <Typography variant="h6">Giới tính</Typography>
          <Typography variant="h6">Mật khẩu</Typography>
          <Typography variant="h6">Email</Typography>
          <Typography variant="h6">Điện thoại</Typography>
          <Typography variant="h6">Xu</Typography>
          <Typography variant="h6">Trạng thái</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6" color="gray">
            {customer.fullName}
          </Typography>
          <Typography variant="h6" color="gray">
            {customer.gender}
          </Typography>
          <Typography variant="h6" color="gray">
            {customer.password}
          </Typography>
          <Typography variant="h6" color="gray">
            {customer.email}
          </Typography>
          <Typography variant="h6" color="gray">
            {customer.phoneNumber}
          </Typography>
          <Typography variant="h6" color="gray">
            {customer.coin}
          </Typography>
          <Typography variant="h6" color="gray">
            {customer.userState}
          </Typography>
        </Box>
      </Box>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Trở lại
      </Button>
    </Box>
  );
};

export default CustomerDetail;
