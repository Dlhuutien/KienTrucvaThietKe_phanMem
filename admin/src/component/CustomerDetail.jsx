import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const CustomerDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy dữ liệu truyền qua khi click "Xem chi tiết"
  const customer = location.state?.customerData;

  if (!customer) {
    return (
      <Box p={2}>
        <Typography variant="h6" color="error">
          Không có dữ liệu khách hàng. Vui lòng quay lại danh sách.
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Trở lại
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
        width: "60%",
        margin: "auto",
        textAlign: "center",
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
      <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
        {customer.fullName}
      </Typography>

      <Grid container spacing={2} sx={{ mt: 3, textAlign: "left" }}>
        <Grid item xs={4}>
          <Typography variant="subtitle1">Tên đầy đủ:</Typography>
          <Typography variant="subtitle1">Giới tính:</Typography>
          <Typography variant="subtitle1">Email:</Typography>
          <Typography variant="subtitle1">Điện thoại:</Typography>
          <Typography variant="subtitle1">Địa chỉ:</Typography>
          <Typography variant="subtitle1">Trạng thái:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography color="gray">{customer.fullName}</Typography>
          <Typography color="gray">{customer.gender}</Typography>
          <Typography color="gray">{customer.email}</Typography>
          <Typography color="gray">{customer.phoneNumber}</Typography>
          <Typography color="gray">{customer.address}</Typography>
          <Typography color="gray">{customer.userState}</Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Trở lại
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerDetail;
