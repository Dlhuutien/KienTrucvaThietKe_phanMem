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
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import { listProvider, deleteProvider } from '../services/ProviderService';

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dialog, setDialog] = useState({ open: false, id: null });

  useEffect(() => {
    fetchProvider();
  }, []);

  const fetchProvider = async () => {
    try {
      const response = await listProvider();
      setProviders(response.data.data);
    } catch (error) {
      console.error("fetchProvider -> error", error);
    }
  }

  const handleDelete = async () => {
    try {
      await deleteProvider(dialog.id);
      fetchProvider();
      setSnackbar({ open: true, message: "Xóa nhà cung cấp thành công!", severity: 'success' });
    } catch (error) {
      console.error("handleDelete -> error", error);
      setSnackbar({ open: true, message: "Xóa nhà cung cấp thất bại!", severity: 'error' });
    } finally {
      setDialog({ open: false, id: null });
    }
  }

  const handleOpenDialog = (id) => {
    setDialog({ open: true, id });
  }

  const handleCloseDialog = () => {
    setDialog({ open: false, id: null });
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  }

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Danh Sách Nhà Cung Cấp
      </Typography>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
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
                    onClick={() => handleOpenDialog(provider.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={dialog.open}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            borderRadius: 15,
            padding: '20px',
            backgroundColor: '#f8f9fa',
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', color: '#d32f2f' }}>
          Xác nhận xóa
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: 'center', fontSize: '1.2rem', color: '#333' }}>
            Bạn có chắc chắn muốn xóa nhà cung cấp này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 5 }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            sx={{ borderRadius: 5 }}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProviderList;
