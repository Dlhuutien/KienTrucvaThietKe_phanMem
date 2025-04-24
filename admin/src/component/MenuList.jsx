import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ReorderIcon from "@mui/icons-material/Reorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HailIcon from "@mui/icons-material/Hail";
import BarChartIcon from "@mui/icons-material/BarChart";
import InventoryIcon from "@mui/icons-material/Inventory";
import DiscountIcon from "@mui/icons-material/Discount";
import shop_logo from "../assets/logo.png";
const MenuList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSanPham, setOpenSanPham] = useState(false);
  const [openKhachHang, setOpenKhachHang] = useState(false);
  const [openNhaCungCap, setOpenNhaCungCap] = useState(false);
  const [openMuaHang, setOpenMuaHang] = useState(false);
  const [openKhuyenMai, setOpenKhuyenMai] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Gọi khi component load
    checkLogin();

    // Lắng nghe khi localStorage thay đổi (từ logout hoặc tab khác)
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleSanPhamClick = () => {
    setOpenSanPham(!openSanPham);
  };

  const handleKhachHangClick = () => {
    setOpenKhachHang(!openKhachHang);
  };

  const handleNhaCungCapClick = () => {
    setOpenNhaCungCap(!openNhaCungCap);
  };

  const handleMuaHangClick = () => {
    setOpenMuaHang(!openMuaHang);
  };
  return (
    <List>
      <ListItem
        button
        component={Link}
        to={"/"}
        sx={{
          backgroundColor: "#F5F5F5",
          height: "100px",
          justifyContent: "center",
          alignContent: "center",
          "&:hover": {
            backgroundColor: "#4a5395",
            boxShadow: "0px 4px 10px #6495ED",
          },
        }}
      >
        <ListItemIcon>
          <img src={shop_logo} alt="Logo" style={{ width: 100, height: 100 }} />
        </ListItemIcon>
      </ListItem>
      {/* Sản phẩm */}
      <ListItem
        button
        onClick={isLoggedIn ? handleSanPhamClick : null}
        sx={{
          backgroundColor: "#D2E2FF",
          opacity: isLoggedIn ? 1 : 0.6,
          pointerEvents: isLoggedIn ? "auto" : "none",
          "&:hover": {
            backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
            boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
            "& .text": {
              color: isLoggedIn ? "#fff" : "inherit",
            },
          },
        }}
      >
        <ListItemIcon>
          <PhoneAndroidIcon />
        </ListItemIcon>
        <ListItemText className="text" primary="Sản phẩm" />
        {openSanPham ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openSanPham} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={isLoggedIn ? Link : "div"}
            to={isLoggedIn ? "/DanhSachSanPham" : "#"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              opacity: isLoggedIn ? 1 : 0.6,
              pointerEvents: isLoggedIn ? "auto" : "none",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
                boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
                "& .text": {
                  color: isLoggedIn ? "#fff" : "inherit",
                },
              },
            }}
          >
            <ListItemIcon>
              <ReorderIcon />
            </ListItemIcon>
            <ListItemText className="text" primary="Danh sách" />
          </ListItem>

          <ListItem
            button
            component={isLoggedIn ? Link : "div"}
            to={isLoggedIn ? "/ThemSanPham" : "#"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              opacity: isLoggedIn ? 1 : 0.6,
              pointerEvents: isLoggedIn ? "auto" : "none",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
                boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
                "& .text": {
                  color: isLoggedIn ? "#fff" : "inherit",
                },
              },
            }}
          >
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText className="text" primary="Thêm sản phẩm" />
          </ListItem>
        </List>
      </Collapse>

      {/* Khách hàng */}
      <ListItem
        button
        onClick={isLoggedIn ? handleKhachHangClick : null}
        sx={{
          backgroundColor: "#D2E2FF",
          opacity: isLoggedIn ? 1 : 0.6,
          pointerEvents: isLoggedIn ? "auto" : "none",
          "&:hover": {
            backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
            boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
            "& .text": {
              color: isLoggedIn ? "#fff" : "inherit",
            },
          },
        }}
      >
        <ListItemIcon>
          <HailIcon />
        </ListItemIcon>
        <ListItemText className="text" primary="Khách hàng" />
        {openKhachHang ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openKhachHang} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={isLoggedIn ? Link : "div"}
            to={isLoggedIn ? "/DanhSachKhachHang" : "#"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              opacity: isLoggedIn ? 1 : 0.6,
              pointerEvents: isLoggedIn ? "auto" : "none",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
                boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
                "& .text": {
                  color: isLoggedIn ? "#fff" : "inherit",
                },
              },
            }}
          >
            <ListItemIcon>
              <ReorderIcon />
            </ListItemIcon>
            <ListItemText className="text" primary="Danh sách" />
          </ListItem>

          <ListItem
            button
            component={isLoggedIn ? Link : "div"}
            to={isLoggedIn ? "/ThemKhachHang" : "#"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              opacity: isLoggedIn ? 1 : 0.6,
              pointerEvents: isLoggedIn ? "auto" : "none",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
                boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
                "& .text": {
                  color: isLoggedIn ? "#fff" : "inherit",
                },
              },
            }}
          >
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText className="text" primary="Thêm khách hàng" />
          </ListItem>
        </List>
      </Collapse>

      {/* Nhà cung cấp */}
      <ListItem
        button
        onClick={isLoggedIn ? handleNhaCungCapClick : null}
        sx={{
          backgroundColor: "#D2E2FF",
          opacity: isLoggedIn ? 1 : 0.6,
          pointerEvents: isLoggedIn ? "auto" : "none",
          "&:hover": {
            backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
            boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
            "& .text": {
              color: isLoggedIn ? "#fff" : "inherit",
            },
          },
        }}
      >
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText className="text" primary="Nhà cung cấp" />
        {openNhaCungCap ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openNhaCungCap} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={isLoggedIn ? Link : "div"}
            to={isLoggedIn ? "/NhaCungCap" : "#"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              opacity: isLoggedIn ? 1 : 0.6,
              pointerEvents: isLoggedIn ? "auto" : "none",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
                boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
                "& .text": {
                  color: isLoggedIn ? "#fff" : "inherit",
                },
              },
            }}
          >
            <ListItemIcon>
              <ReorderIcon />
            </ListItemIcon>
            <ListItemText className="text" primary="Danh sách" />
          </ListItem>

          <ListItem
            button
            component={isLoggedIn ? Link : "div"}
            to={isLoggedIn ? "/ThemNhaCungCap" : "#"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              opacity: isLoggedIn ? 1 : 0.6,
              pointerEvents: isLoggedIn ? "auto" : "none",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
                boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
                "& .text": {
                  color: isLoggedIn ? "#fff" : "inherit",
                },
              },
            }}
          >
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText className="text" primary="Thêm nhà cung cấp" />
          </ListItem>
        </List>
      </Collapse>

      {/* Mua hàng */}
      <ListItem
        button
        onClick={isLoggedIn ? handleMuaHangClick : null}
        sx={{
          backgroundColor: "#D2E2FF",
          opacity: isLoggedIn ? 1 : 0.6,
          pointerEvents: isLoggedIn ? "auto" : "none",
          "&:hover": {
            backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
            boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
            "& .text": {
              color: isLoggedIn ? "#fff" : "inherit",
            },
          },
        }}
      >
        <ListItemIcon>
          <PhoneAndroidIcon />
        </ListItemIcon>
        <ListItemText className="text" primary="Mua hàng" />
        {openMuaHang ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openMuaHang} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={isLoggedIn ? Link : "div"}
            to={isLoggedIn ? "/NhapHang" : "#"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              opacity: isLoggedIn ? 1 : 0.6,
              pointerEvents: isLoggedIn ? "auto" : "none",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
                boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
                "& .text": {
                  color: isLoggedIn ? "#fff" : "inherit",
                },
              },
            }}
          >
            <ListItemIcon>
              <ReorderIcon />
            </ListItemIcon>
            <ListItemText className="text" primary="Danh sách" />
          </ListItem>

          <ListItem
            button
            component={isLoggedIn ? Link : "div"}
            to={isLoggedIn ? "/ThemNhapHang" : "#"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              opacity: isLoggedIn ? 1 : 0.6,
              pointerEvents: isLoggedIn ? "auto" : "none",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: isLoggedIn ? "#4a5395" : "#D2E2FF",
                boxShadow: isLoggedIn ? "0px 6px 15px #00008B" : "none",
                "& .text": {
                  color: isLoggedIn ? "#fff" : "inherit",
                },
              },
            }}
          >
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText className="text" primary="Mua thêm hàng" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default MenuList;
