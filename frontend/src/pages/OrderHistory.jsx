import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
} from "@mui/material";
import { getOrdersByUserId } from "../services/OrderService";
import { message } from "antd";

const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const getStatusColor = (status) => {
    switch (status) {
        case "PENDING":
            return "warning";
        case "PROCESSING":
            return "info";
        case "SHIPPED":
            return "primary";
        case "DELIVERED":
            return "success";
        case "CANCELLED":
            return "error";
        default:
            return "default";
    }
};

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await getOrdersByUserId(1); // tạm thời userId
            setOrders(response.data);
        } catch (error) {
            console.error("Error loading orders:", error);
            message.error("Không thể tải lịch sử đơn hàng");
        }
    };

    return (
        <Box sx={{ padding: 2, maxWidth: "1200px", margin: "auto" }}>
            <Typography variant="h5" align="center" sx={{ marginBottom: 4 }}>
                Lịch sử đơn hàng
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#1976d2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>Mã đơn hàng</TableCell>
                            <TableCell sx={{ color: "white" }}>Ngày đặt</TableCell>
                            <TableCell sx={{ color: "white" }}>Địa chỉ giao hàng</TableCell>
                            <TableCell sx={{ color: "white" }}>Số điện thoại</TableCell>
                            <TableCell sx={{ color: "white" }}>Tổng tiền</TableCell>
                            <TableCell sx={{ color: "white" }}>Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>#{order.id}</TableCell>
                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                <TableCell>{order.shippingAddress}</TableCell>
                                <TableCell>{order.phoneNumber}</TableCell>
                                <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.status}
                                        color={getStatusColor(order.status)}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrderHistory; 