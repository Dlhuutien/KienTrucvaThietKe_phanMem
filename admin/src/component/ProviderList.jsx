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

const mockProviders = [
  {
    id: 1,
    name: "Nhà cung cấp A",
    address: "Hà Nội",
    email: "a@example.com",
    origin: "Việt Nam",
  },
  {
    id: 2,
    name: "Nhà cung cấp B",
    address: "TP. Hồ Chí Minh",
    email: "b@example.com",
    origin: "Việt Nam",
  },
  {
    id: 3,
    name: "Nhà cung cấp C",
    address: "Đà Nẵng",
    email: "c@example.com",
    origin: "Việt Nam",
  },
];

const ProviderList = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    setProviders(mockProviders);
  }, []);

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Danh Sách Nhà Cung Cấp
      </Typography>
      <TableContainer component={Paper} style={{ maxHeight: 650 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Tên nhà cung cấp</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Xuất xứ</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providers.map((provider, index) => (
              <TableRow key={provider.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{provider.name}</TableCell>
                <TableCell>{provider.address}</TableCell>
                <TableCell>{provider.email}</TableCell>
                <TableCell>{provider.origin}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/CapNhatNhaCungCap?id=${provider.id}`}
                    state={{ providerData: provider }}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 2 }}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(provider.id)}
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

export default ProviderList;
