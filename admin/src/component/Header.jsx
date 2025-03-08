import React from "react";
import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Header = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      p={5}
      sx={{
        backgroundColor: "#fff",
        borderRadius: 3,
      }}
    >
      <Link to="/DangNhap" style={{ textDecoration: "none", color: "inherit" }}>
        <Box
          sx={{
            display: "flex",
            cursor: "pointer", // Make it visually clear that it's clickable
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
