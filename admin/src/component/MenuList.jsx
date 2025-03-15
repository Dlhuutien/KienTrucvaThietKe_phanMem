import React, { useState } from "react";
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
const MenuList = () => {
  const [openSanPham, setOpenSanPham] = useState(false);
  const [openKhachHang, setOpenKhachHang] = useState(false);
  const [openNhaCungCap, setOpenNhaCungCap] = useState(false);
  const [openMuaHang, setOpenMuaHang] = useState(false);
  const [openKhuyenMai, setOpenKhuyenMai] = useState(false);

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
          backgroundColor: "#FF6F00",
          height: "100px",
          "&:hover": {
            backgroundColor: "#FF6F00",
          },
        }}
      >
        <ListItemText
          primary="PhoneGO"
          primaryTypographyProps={{
            sx: {
              textAlign: "center",
              fontWeight: "bold",
              color: "#fff",
              fontSize: "20px",
            },
          }}
        />
      </ListItem>
      <ListItem
        button
        onClick={handleSanPhamClick}
        sx={{
          backgroundColor: "#D2E2FF",
          "&:hover": {
            backgroundColor: "#FF6F00",
            "& .text": {
              color: "#fff",
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
            component={Link}
            to={"/DanhSachSanPham"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: "#FF6F00",
                "& .text": {
                  color: "#fff",
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
            component={Link}
            to={"/ThemSanPham"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: "#FF6F00",
                "& .text": {
                  color: "#fff",
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

      <ListItem
        button
        onClick={handleKhachHangClick}
        sx={{
          backgroundColor: "#D2E2FF",
          "&:hover": {
            backgroundColor: "#FF6F00",
            "& .text": {
              color: "#fff",
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
            component={Link}
            to={"/DanhSachKhachHang"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: "#FF6F00",
                "& .text": {
                  color: "#fff",
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
            component={Link}
            to={"/ThemKhachHang"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: "#FF6F00",
                "& .text": {
                  color: "#fff",
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

      <ListItem
        button
        onClick={handleNhaCungCapClick}
        sx={{
          backgroundColor: "#D2E2FF",
          "&:hover": {
            backgroundColor: "#FF6F00",
            "& .text": {
              color: "#fff",
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
            component={Link}
            to={"/NhaCungCap"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: "#FF6F00",
                "& .text": {
                  color: "#fff",
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
            component={Link}
            to={"/ThemNhaCungCap"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: "#FF6F00",
                "& .text": {
                  color: "#fff",
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

      <ListItem
        button
        onClick={handleMuaHangClick}
        sx={{
          backgroundColor: "#D2E2FF",
          "&:hover": {
            backgroundColor: "#FF6F00",
            "& .text": {
              color: "#fff",
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
            component={Link}
            to={"/NhapHang"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: "#FF6F00",
                "& .text": {
                  color: "#fff",
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
            component={Link}
            to={"/ThemNhapHang"}
            sx={{
              pl: 4,
              backgroundColor: "#D2E2FF",
              textDecoration: "none",
              color: "black",
              "&:hover": {
                backgroundColor: "#FF6F00",
                "& .text": {
                  color: "#fff",
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
