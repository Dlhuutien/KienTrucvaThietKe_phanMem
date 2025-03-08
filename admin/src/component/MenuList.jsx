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

const MenuList = () => {
  const [openSanPham, setOpenSanPham] = useState(false);

  const handleSanPhamClick = () => {
    setOpenSanPham(!openSanPham);
  };

  return (
    <List>
      <ListItem
        button
        component={Link}
        to={"/"}
        sx={{
          backgroundColor: "#3E81FF",
          height: "100px",
          "&:hover": {
            backgroundColor: "#3E81FF",
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
            backgroundColor: "#3E81FF",
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
                backgroundColor: "#3E81FF",
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
                backgroundColor: "#3E81FF",
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
    </List>
  );
};

export default MenuList;
