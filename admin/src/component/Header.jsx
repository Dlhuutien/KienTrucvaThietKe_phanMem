import React from "react";
import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      p={5}
      sx={{
        backgroundColor: "#4a5395",
        borderRadius: 3,
      }}
    >
      <Link to="/DangNhap" style={{ textDecoration: "none", color: "inherit" }}>
        <Box
          sx={{
            display: "flex",
            cursor: "pointer",
            backgroundColor: "#D2E2FF",
            p:2,
            borderRadius: 3,
            boxShadow: "0px 4px 10px #6495ED",
          }}
        >
          <AccountCircleIcon />
          <Typography variant="body1">Tài khoản</Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default Header;
